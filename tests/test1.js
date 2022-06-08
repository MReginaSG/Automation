import { Selector } from 'testcafe';
import { ClientFunction } from 'testcafe';
import HomePage from '../po/HomePage'
import DressPage from '../po/DressPage'


fixture`Getting Started`

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
        .click("#list > a")
        .click("li:nth-child(1)  a.button.ajax_add_to_cart_button")
    await Selector("#layer_cart > div.clearfix").with({ visibilityCheck: true })
    await t
        .expect(Selector("div.layer_cart_product h2").innerText).eql("Product successfully added to your shopping cart")
    console.log(await Selector("span#layer_cart_product_title.product-name").innerText)
    await t
        .expect(Selector("span#layer_cart_product_title.product-name").innerText).eql("Printed Dress")
        .wait(10000)

});

test('Verify the user is able to selects a suggestion from the search box.', async t => {
    await t
        .typeText("#search_query_top", "Printed")
    const printed = Selector(".ac_results li:first-child")
    await t.click(printed)
    const categoryBar = Selector(".breadcrumb").child("a")
    for (let i = 0; i < await categoryBar.count; i++) { console.log(await categoryBar.nth(i).innerText) }

});

test('Verify the user is able to navigate to empty Cart.', async t => {
    await t.click('a[title="View my shopping cart"]');
    const getLocation = ClientFunction(() => document.location.href);
    await t.expect(getLocation()).contains('http://automationpractice.com/index.php?controller=order');
    await t.expect(Selector("p.alert-warning").innerText).eql("Your shopping cart is empty.")
});

test('Verify the user removes item from the shopping cart.', async t => {
    await t
        .click(HomePage.getMenuContent(2))
        .click("#list > a")
        .click("li:nth-child(2)  a.button.ajax_add_to_cart_button")
        .click(" div.layer_cart_product.col-xs-12.col-md-6 > span")
        .click("li:nth-child(3)  a.button.ajax_add_to_cart_button")
        .click(" div.layer_cart_product.col-xs-12.col-md-6 > span")
        .hover("#header div:nth-child(3) > div > a")
    const removeButtom = Selector(".ajax_cart_block_remove_link").nth(0)
    await t.click(removeButtom)
        .wait(5000)
    const productCount = await Selector(".ajax_cart_quantity").innerText
    await t.expect(productCount).eql("1")

});

test('Verify the user can send a customer service message.', async t => {
    await t
        .click("#contact-link")
        .click("#id_contact")
    const dropDownOptions = Selector("option").nth(1)
    await t.click(dropDownOptions)
        .typeText("#email", "lachiwi@best.com")
        .typeText("#id_order", "080895")
        .typeText("#message", "mi vestido vino roto compadres,¿que procede?")
        .click("#submitMessage")
    await t.expect(Selector(".alert-success").innerText).contains("Your message has been successfully sent to our team.")

});

//😊💕✌