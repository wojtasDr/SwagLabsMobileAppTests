import LoginPage from '../pageobjects/login.page'
import ProductsPage from "../pageobjects/products.page.ts";
import CartPage from "../pageobjects/cart.page.ts";
import CheckoutInformationPage from "../pageobjects/checkout.information.page.ts";
import CheckoutOverviewPage from "../pageobjects/checkout.overview.page.ts";
import CheckoutCompletePage from "../pageobjects/checkout.complete.page.ts";
import ActionsUtils from "../utils/action.utils.ts";
import WaitUtils from "../utils/wait.utils.ts";
import ProductsPageValidators from "../validators/products.page.validators.ts";

describe('Purchase process tests', () => {
    const productName: string = 'Sauce Labs Onesie'
    const productPrice: string = '$7.99';

    beforeEach(async () => {
        await LoginPage.login('standard_user', 'secret_sauce');
    });

    it('Check purchase process - happy path', async () => {
        //add product to cart
        await ProductsPage.addProductToCart(productName);

        //open cart and check if product was added correctly
        await ProductsPage.goToCart();
        await expect(await CartPage.getProductQuantity(productName)).toEqual('1');
        await expect(await CartPage.getProductPrice(productName)).toEqual(productPrice);

        //checkout the cart, fill in all personal information and go to purchase summary page
        await CartPage.checkoutCart();
        await CheckoutInformationPage.fillInCheckoutFormAndContinue('Jan\n', 'Kowalski\n', '00-000\n');

        //check if summary page shows correct data about product and price
        await expect(await CheckoutOverviewPage.getProductName()).toEqual(productName);
        await expect(await CheckoutOverviewPage.getProductQuantity(productName)).toEqual('1');
        await expect(await CheckoutOverviewPage.getProductPrice(productName)).toEqual(productPrice);
        await expect(await CheckoutOverviewPage.getTotalNetPrice()).toEqual(`Item total: ${productPrice}`);
        await expect(await CheckoutOverviewPage.getTotalTax()).toEqual('Tax: $0.64');
        await expect(await CheckoutOverviewPage.getTotalGrossPrice()).toEqual('Total: $8.63');

        //finish the purchase and check if processed correctly
        await CheckoutOverviewPage.clickFinishButton();
        await expect(await CheckoutCompletePage.getSuccessMessageText()).toEqual('THANK YOU FOR YOU ORDER');
    });

    it('Check obligatory fields validation', async () => {
        //add product to cart and do the checkout
        await ProductsPage.addProductToCart(productName);
        await ProductsPage.goToCart();
        await CartPage.checkoutCart();

        //validate if First Name input field is obligatory
        await CheckoutInformationPage.clickContinueButton();
        await WaitUtils.waitForTextInElement(CheckoutInformationPage.errorMessage, 'First Name is required');

        //validate if Last Name input field is obligatory
        await CheckoutInformationPage.typeFirstName('Jan\n');
        await CheckoutInformationPage.clickContinueButton();
        await WaitUtils.waitForTextInElement(CheckoutInformationPage.errorMessage, 'Last Name is required');

        //validate if Postal Code input field is obligatory
        await CheckoutInformationPage.typeLastName('Kowalski\n');
        await CheckoutInformationPage.clickContinueButton();
        await WaitUtils.waitForTextInElement(CheckoutInformationPage.errorMessage, 'Postal Code is required');

        //validate if user can proceed to next page
        await CheckoutInformationPage.typeZipPostalCode('99-900\n');
        await CheckoutInformationPage.clickContinueButton();
        await expect(await CheckoutOverviewPage.getProductName()).toEqual(productName);
    });

    it('Check if products can be sorted by title and price in natural and reverse order', async () => {
        //Check products sorting by title in natural order
        await ProductsPage.filterProductsBy('Name (A to Z)');
        let productTitles: string[] = await ProductsPage.getProductsAttributes('title');
        await expect(productTitles).toEqual([...productTitles].sort());
        await ActionsUtils.scrollToBeginning();

        //Check products sorting by title in reverse order
        await ProductsPage.filterProductsBy('Name (Z to A)');
        productTitles = await ProductsPage.getProductsAttributes('title');
        await expect(productTitles).toEqual([...productTitles].sort().reverse());
        await ActionsUtils.scrollToBeginning();

        //Check products sorting by price in natural order
        await ProductsPage.filterProductsBy('Price (low to high)');
        let productPrices: string[] = await ProductsPage.getProductsAttributes('Price');
        await ProductsPageValidators.expectProductsAreSortedByPrice(productPrices);
        await ActionsUtils.scrollToBeginning();

        //Check products sorting by price in reverse order
        await ProductsPage.filterProductsBy('Price (high to low)');
        productPrices = await ProductsPage.getProductsAttributes('Price');
        await ProductsPageValidators.expectProductsAreSortedByPrice(productPrices, true);
    });

    it('Check if products can be added and deleted from cart', async () => {
        const secondProductName: string = 'Sauce Labs Bike Light';
        const thirdProductName: string = 'Sauce Labs Backpack';

        //check ig cart is empty
        await expect(await CartPage.cartItemsNumber.isExisting()).toEqual(false);

        //add 3 products to cart
        await ProductsPage.addProductToCart(productName);
        await ProductsPage.addProductToCart(secondProductName);
        await ProductsPage.addProductToCart(thirdProductName);

        //check if cart icon shows number 3
        await WaitUtils.waitForTextInElement(ProductsPage.cartItemsNumber, '3');

        //remove third product from cart - products page
        await ProductsPage.removeProductFromCart(thirdProductName);

        //check if cart icon was decreased to 2
        await WaitUtils.waitForTextInElement(ProductsPage.cartItemsNumber, '2');

        // go to cart and remove all products
        await ProductsPage.goToCart();
        await CartPage.removeProductFromCart(productName);
        await CartPage.removeProductFromCart(secondProductName);

        //check if cart icon does not show any number
        await WaitUtils.waitForElementToDisappear(CartPage.cartItemsNumber);
    });
})

