/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

describe('Shop', () => {
    beforeEach(() => {
        // all the tests have to load the base route
        cy.visit('/');
      })
    it('should load shopping list', () => {
        // Checks if the page loaded successfully
        cy.get('#shopping-list').should('exist')
        cy.get('title').should('contain', 'Shop | Catalogue')
    });

    it("should add to cart", () => {
        // Go to the product page
        cy.get('[data-test-id="shopping-item"]').first().click();
        // wait for react to render the new page 
        cy.wait(500);

        // Click Add to cart Button
        cy.findByText('Add to cart').click();
        
        // test that the app notified user of the added item
        const appNotifier =  cy.get('#app-notifier').should('exist');
        appNotifier.should('contain','item added successfully');
        cy.wait(1000);

        // test that the cart indicator was changed to reflect new 
        // cart length
        cy.get('#cart-indicator').should('contain', 'Cart(1)');
    });

    it('should add and remove from cart', () => {
        // Same process as above
        cy.get('[data-test-id="shopping-item"]').first().click();
        // wait for page to render
        cy.wait(500);
        cy.findByText('Add to cart').click();
        cy.get('#cart-indicator').should('contain', 'Cart(1)');
        // Go to the Cart page
        cy.get('#cart-indicator').click();
        // wait for page to render
        cy.wait(500);

        // Test that the add button increments the number of this item
        // in this cart
        cy.get('[data-test-id="btn-add"]').first().click();
        const text =  cy.get('[data-test-id="text-count"]:first-of-type').as('counterText');
        cy.wait(500);
        text.should('contain', '2');

        // Test that the remove button decrements the number of 
        // this item in this cart
        const btn = cy.get('[data-test-id="btn-remove"]').first();
        btn.click();
        cy.wait(500);
        text.should('contain', '1');
        
        // Test that the item is completely removed from the cart 
        // when the item count goes to zero
        btn.click();
        cy.wait(500);
        cy.get('#shopping-cart [data-test-id="cart-item"]').should('have.length', 0);
    });

    it('should checkout from store', () => {
        // This tests that a user is able to checkout 
        // from the shop website


        // go to cart page
        cy.get('[data-test-id="shopping-item"]').first().click();
        // wait for page to render
        cy.wait(500);
        // add item to card
        cy.get('#submit-btn').click();
        cy.get('#cart-indicator').should('contain', 'Cart(1)');
        cy.get('#cart-indicator').click();
        // wait for page to render
        cy.wait(500);
        // add one more item
        cy.get('[data-test-id="btn-add"]').first().click();
        cy.wait(500);
        // go to checkout page
        cy.get('#checkout-link').click();
        cy.wait(500);
        const checkoutButton = cy.get('#checkout-button');
        checkoutButton.should('contain', 'Checkout');
        // Click on the checkout button and start the checkout sequence
        checkoutButton.click();
        checkoutButton.should('contain', 'Cancel(10)');
        cy.wait(3000);
        // Test that the countdown squence works
        checkoutButton.should('contain', 'Cancel(7)');

        checkoutButton.click();
        // Test that the sequence stops if interrupted inside 10 seconds 
        // from initiation
        checkoutButton.should('contain', 'Checkout');
        checkoutButton.click();
        checkoutButton.should('contain', 'Cancel(10)');

        // Wait for checkout countdown sequence to complete
        cy.wait(10100);

        // Test that the confirmation overlay is shown
        cy.findByText("Completing checkout").should('exist');

        // wait for checkout to complete
        cy.wait(1600)

        // Test that a notification is sent to the user confirming their 
        // checkout
        cy.get('#app-notifier').should('contain', 'Checkout was successfull, thanks for shopping');
    })


});