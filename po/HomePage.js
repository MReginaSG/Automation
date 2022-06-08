import { Selector } from 'testcafe';

class HomePage {
    constructor () {
        this.menuContent

    }

    getMenuContent(section){
        return  this.menuContent = Selector(`#block_top_menu > ul > li:nth-child(${section})`);
    }
}

export default new HomePage();