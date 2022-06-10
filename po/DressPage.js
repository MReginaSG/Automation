import { Selector } from 'testcafe';

class DressPage {
    constructor () {
        this.quickViewImage 
        this.cartButton = Selector('a.ajax_add_to_cart_button')
        this.cartModal = Selector('#layer_cart > div.clearfix')
        this.checkLabel = Selector('div.layer_cart_product h2')
        this.productName= Selector('span#layer_cart_product_title.product-name')
        this.typeOfView= Selector('#list > a')
        this.searchResult = Selector(".ac_results li:first-child")
        this.searchBar = Selector("#search_query_top")
        this.cart = Selector('a[title="View my shopping cart"]')
        this.cartLabel = Selector("p.alert-warning")
        this.xButton = Selector(" div.layer_cart_product.col-xs-12.col-md-6 > span")
        this.cartDropDown = Selector("#header div:nth-child(3) > div > a")
        this.cartXButton = Selector(".ajax_cart_block_remove_link")
        this.cartQuantity = Selector(".ajax_cart_quantity")
    }

    getImageClothe(imageOption){
        return this.quickViewImage = Selector(`li:nth-child(${imageOption}) div> div.left-block`)
    }
    
    getNumberProduct(product){
        return  Selector(`li:nth-child(${product})  a.button.ajax_add_to_cart_button`)
    }
}

export default new DressPage();