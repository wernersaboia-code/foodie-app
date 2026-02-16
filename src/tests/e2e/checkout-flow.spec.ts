// src/tests/e2e/checkout-flow.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Complete Checkout Flow', () => {
    test('should complete entire order flow', async ({ page }) => {
        // 1. Go to home
        await page.goto('/');

        // 2. Click on restaurant
        await page.getByText('Burger King').click();
        await expect(page).toHaveURL(/\/restaurant\/1/);

        // 3. Add item to cart
        await page.getByText('Whopper').click();
        await page.getByRole('button', { name: /adicionar/i }).click();

        // 4. Go to cart
        await page.goto('/cart');
        await expect(page.getByText('Whopper')).toBeVisible();

        // 5. Apply coupon
        await page.getByPlaceholderText(/cupom/i).fill('PRIMEIRA');
        await page.getByRole('button', { name: /aplicar/i }).click();
        await expect(page.getByText(/desconto/i)).toBeVisible();

        // 6. Go to checkout
        await page.getByRole('link', { name: /pagamento/i }).click();
        await expect(page).toHaveURL('/checkout');

        // 7. Fill address
        await page.getByLabel(/rua/i).fill('Rua das Flores');
        await page.getByLabel(/número/i).fill('123');
        await page.getByLabel(/bairro/i).fill('Centro');
        await page.getByLabel(/cidade/i).fill('São Paulo');
        await page.getByLabel(/uf/i).selectOption('SP');
        await page.getByLabel(/cep/i).fill('01234-567');

        // 8. Select payment
        await page.getByText('Pix').click();

        // 9. Confirm order
        await page.getByRole('button', { name: /confirmar pedido/i }).click();

        // 10. Check confirmation page
        await expect(page).toHaveURL(/\/order\//);
        await expect(page.getByText(/pedido confirmado/i)).toBeVisible();
        await expect(page.getByText(/previsão de entrega/i)).toBeVisible();
    });
});