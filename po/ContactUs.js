import { Selector } from 'testcafe';

class ContactUs {
    constructor () {
        this.contactUsButton = Selector("#contact-link")
        this.subjectDropDown = Selector("#id_contact")
        this.dropDownOptions = Selector("option")
        this.emailAdress = Selector("#email")
        this.orderReference = Selector("#id_order")
        this.MessageSection = Selector("#message")
        this.submitButton = Selector("#submitMessage")
        this.succesMessage = Selector(".alert-success")

    }

}

export default new ContactUs();