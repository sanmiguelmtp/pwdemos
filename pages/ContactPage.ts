// pages/ContactPage.ts
import { Page } from '@playwright/test';

export class ContactPage {
    // Variables
    private readonly page: Page;
    private readonly contactLink;
    private readonly contactEmailInput;
    private readonly contactNameInput;
    private readonly messageTextarea;
    private readonly sendMessageButton;
    private readonly closeButton;

    // Constructor
    constructor(page: Page) {
        this.page = page;

        // "Contact" link in the top navbar
        this.contactLink = page.getByRole('link', { name: 'Contact' });

        // Fields inside the Contact modal (#exampleModal)
        this.contactEmailInput = page.locator('#recipient-email');
        this.contactNameInput = page.locator('#recipient-name');
        this.messageTextarea = page.locator('#message-text');

        // Buttons inside the modal
        this.sendMessageButton = page.getByRole('button', { name: 'Send message' });
        // Target the footer Close button specifically (not the × icon at the top)
        this.closeButton = page.locator('#exampleModal .modal-footer button[data-dismiss="modal"]');
    }

    // Methods

    /** Abre el modal de contacto desde la barra de navegación */
    async openContactModal() {
        await this.contactLink.click();
        await this.contactEmailInput.waitFor({ state: 'visible' });
    }

    /** Rellena el campo Contact Email */
    async enterContactEmail(email: string) {
        await this.contactEmailInput.clear();
        await this.contactEmailInput.fill(email);
    }

    /** Rellena el campo Contact Name */
    async enterContactName(name: string) {
        await this.contactNameInput.clear();
        await this.contactNameInput.fill(name);
    }

    /** Rellena el campo Message */
    async enterMessage(message: string) {
        await this.messageTextarea.clear();
        await this.messageTextarea.fill(message);
    }

    /** Envía el formulario, acepta el diálogo de confirmación y devuelve su texto */
    async sendMessage(): Promise<string> {
        let dialogText = '';
        this.page.once('dialog', async (dialog) => {
            dialogText = dialog.message();
            await dialog.accept();
        });
        await this.sendMessageButton.click();
        // Espera a que el modal se cierre tras aceptar el diálogo
        await this.page.locator('#exampleModal').waitFor({ state: 'hidden' });
        return dialogText;
    }

    /** Cierra el modal sin enviar */
    async closeModal() {
        await this.closeButton.click();
    }

    /** Método compuesto: abre el modal, rellena todos los campos y envía */
    async performContact(email: string, name: string, message: string) {
        await this.openContactModal();
        await this.enterContactEmail(email);
        await this.enterContactName(name);
        await this.enterMessage(message);
        await this.sendMessage();
    }
}
