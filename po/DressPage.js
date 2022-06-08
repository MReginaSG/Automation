import { Selector } from 'testcafe';

class DressPage {
    constructor () {
        this.quickViewImage 
        this.cartButton = Selector('a.ajax_add_to_cart_button')
        this.cartModal = Selector('#layer_cart > div.clearfix')
        this.checkLabel = Selector('div.layer_cart_product h2')
        this.productName= Selector('span#layer_cart_product_title.product-name')
    }

    getImageClothe(imageOption){
        return this.quickViewImage = Selector(`li:nth-child(${imageOption}) div> div.left-block`)
    }
}

export default new DressPage();