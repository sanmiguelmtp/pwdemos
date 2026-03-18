import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { CartPage } from '../pages/CartPage';
import { ContactPage } from '../pages/ContactPage';

test('Verificar login y añadir un producto al carrito', async ({ page }) => {
    await page.goto('/index.html')

    //Página de Login
    const loginPage = new LoginPage(page);
    await loginPage.performLogin("pavanol", "test@123");

    //HomePage
    const homePage = new HomePage(page);
    await homePage.addProductToCart("Samsung galaxy s6");
    await homePage.gotoCart();


    //Página del carrito
    const cartPage = new CartPage(page);
    const productCount = await cartPage.checkProductInCart("Samsung galaxy s6");
    expect(productCount).toBeGreaterThanOrEqual(1);
})

// ─── ContactPage tests ────────────────────────────────────────────────────────

test.describe('ContactPage - Casos positivos', () => {

    let contactPage: ContactPage;

    test.beforeEach(async ({ page }) => {
        await page.goto('/index.html');
        contactPage = new ContactPage(page);
    });

    test('Abrir el modal de contacto y verificar que los campos están visibles', async ({ page }) => {

        await contactPage.openContactModal();

        await expect(page.locator('#recipient-email')).toBeVisible();
        await expect(page.locator('#recipient-name')).toBeVisible();
        await expect(page.locator('#message-text')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Send message' })).toBeVisible();
    });

    test('Enviar formulario de contacto con todos los campos rellenos', async ({ page }) => {

        await contactPage.performContact("test@example.com", "Test User", "Este es un mensaje de prueba.");

        // Tras aceptar el diálogo el modal debe cerrarse
        await expect(page.locator('#exampleModal')).not.toBeVisible();
    });

    test('Cerrar el modal de contacto sin enviar', async ({ page }) => {

        await contactPage.openContactModal();
        await contactPage.enterContactEmail("close@example.com");
        await contactPage.closeModal();

        await expect(page.locator('#exampleModal')).not.toBeVisible();
    });

    test('Rellenar los campos individualmente y verificar sus valores', async ({ page }) => {

        await contactPage.openContactModal();
        await contactPage.enterContactEmail("individual@example.com");
        await contactPage.enterContactName("Individual Name");
        await contactPage.enterMessage("Mensaje individual de prueba.");

        await expect(page.locator('#recipient-email')).toHaveValue("individual@example.com");
        await expect(page.locator('#recipient-name')).toHaveValue("Individual Name");
        await expect(page.locator('#message-text')).toHaveValue("Mensaje individual de prueba.");
    });

});

test.describe('ContactPage - Casos negativos', () => {

    let contactPage: ContactPage;

    test.beforeEach(async ({ page }) => {
        await page.goto('/index.html');
        contactPage = new ContactPage(page);
    });

    test('Enviar el formulario con todos los campos vacíos muestra diálogo', async ({ page }) => {

        await contactPage.openContactModal();
        const dialogText = await contactPage.sendMessage();

        // La app envía de todas formas y muestra un diálogo (sin validación client-side)
        expect(dialogText.length).toBeGreaterThan(0);
        await expect(page.locator('#exampleModal')).not.toBeVisible();
    });

    test('Enviar el formulario solo con email muestra diálogo', async ({ page }) => {

        await contactPage.openContactModal();
        await contactPage.enterContactEmail("solo-email@example.com");
        const dialogText = await contactPage.sendMessage();

        // La app procesa el envío y muestra un diálogo aunque falten campos
        expect(dialogText.length).toBeGreaterThan(0);
        await expect(page.locator('#exampleModal')).not.toBeVisible();
    });

    test('Enviar el formulario con email en formato inválido muestra diálogo', async ({ page }) => {

        await contactPage.openContactModal();
        await contactPage.enterContactEmail("email-no-valido");
        await contactPage.enterContactName("Usuario");
        await contactPage.enterMessage("Mensaje con email inválido.");
        const dialogText = await contactPage.sendMessage();

        // La app no valida el formato del email: muestra diálogo igualmente
        expect(dialogText.length).toBeGreaterThan(0);
        await expect(page.locator('#exampleModal')).not.toBeVisible();
    });

    test('Verificar que el modal se puede abrir y cerrar repetidamente', async ({ page }) => {

        // Primera apertura y cierre
        await contactPage.openContactModal();
        await expect(page.locator('#exampleModal')).toBeVisible();
        await contactPage.closeModal();
        await expect(page.locator('#exampleModal')).not.toBeVisible();

        // Segunda apertura: el modal debe volver a estar accesible y vacío
        await contactPage.openContactModal();
        await expect(page.locator('#recipient-email')).toHaveValue('');
        await expect(page.locator('#recipient-name')).toHaveValue('');
        await expect(page.locator('#message-text')).toHaveValue('');
    });

});