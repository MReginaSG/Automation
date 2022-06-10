import { Selector } from 'testcafe';
import { ClientFunction } from 'testcafe';
import HomePage from '../po/HomePage'
import DressPage from '../po/DressPage'
import ContactUs from '../po/ContactUs'


fixture`Test the Automation Practice Page`

    .page`http://automationpractice.com/index.php`

test('Verify the user is able to add items to the shopping cart in the grid view.', async t => {
    await t
        .maximizeWindow()
        .click(HomePage.getMenuContent(2))
        .hover(DressPage.getImageClothe(2))
        .click(DressPage.cartButton.nth(1))
    DressPage.cartModal.with({ visibilityCheck: true })
    await t.expect(DressPage.checkLabel.innerText).eql("Product successfully added to your shopping cart")
    await t.expect(DressPage.productName.innerText).eql("Printed Dress")
});

test('Verify the user is able to add items to the shopping cart in the list view.', async t => {
    await t
        .click(HomePage.getMenuContent(2))
        .click(DressPage.typeOfView)
        .click(DressPage.getNumberProduct(1))
    await DressPage.cartModal.with({ visibilityCheck: true })
    await t.expect(DressPage.checkLabel.innerText).eql("Product successfully added to your shopping cart")
    await t.expect(DressPage.productName.innerText).eql("Printed Dress")
        .wait(10000)

});

test('Verify the user is able to selects a suggestion from the search box.', async t => {
    await t
        .typeText(DressPage.searchBar, "Printed")
    const printed = DressPage.searchResult
    await t.click(printed)
    const categoryBar = DressPage.CategoryBar.child("a")
    for (let i = 0; i < await categoryBar.count; i++) { console.log(await categoryBar.nth(i).innerText) }

});

test('Verify the user is able to navigate to empty Cart.', async t => {
    await t.click(DressPage.cart);
    const getLocation = ClientFunction(() => document.location.href);
    await t.expect(getLocation()).contains('http://automationpractice.com/index.php?controller=order');
    await t.expect(DressPage.cartLabel.innerText).eql("Your shopping cart is empty.")
});

test('Verify the user removes item from the shopping cart.', async t => {
    await t
        .click(HomePage.getMenuContent(2))
        .click(DressPage.typeOfView)
        .click(DressPage.getNumberProduct(2))
        .click(DressPage.xButton)
        .click(DressPage.getNumberProduct(3))
        .click(DressPage.xButton)
        .hover(DressPage.cartDropDown)
    const removeButtom = DressPage.cartXButton.nth(0)
    await t.click(removeButtom)
        .wait(5000)
    const productCount = await DressPage.cartQuantity.innerText
    await t.expect(productCount).eql("1")

});

test('Verify the user can send a customer service message.', async t => {
    await t
        .click(ContactUs.contactUsButton)
        .click(ContactUs.subjectDropDown)
    const dropDownOptions = ContactUs.dropDownOptions.nth(1)
    await t.click(dropDownOptions)
        .typeText(ContactUs.emailAdress, "lachiwi@best.com")
        .typeText(ContactUs.orderReference, "080895")
        .typeText(ContactUs.MessageSection, "mi vestido vino roto compadres,¿que procede?")
        .click(ContactUs.submitButton)
    await t.expect(ContactUs.succesMessage.innerText).contains("Your message has been successfully sent to our team.")

});

//😊💕✌