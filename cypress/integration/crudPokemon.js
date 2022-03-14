describe("CRUD de pokemones", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("Insertando pokemon", () => {
    cy.get(".btn").click();
    cy.get(".form-group > p").contains("Nuevo Pokemon");
    cy.get("#nombre").type("Charmander");
    cy.get("#imagen").type(
        "https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png"
      );
    cy.get(".btn-guardar").click();
    cy.get('.mensaje').contains("Pokemon insertado correctamente")
  });
  it("Editando pokemon", () => {
    cy.get(':nth-child(1) > :nth-child(5) > [value="🖉"] > .bi').click();
    cy.get(".form-group > p").contains("Editar Pokemon");
    cy.get("#nombre").clear();
    cy.get(".btn-guardar").should("be.disabled");
    cy.get("#nombre").type("Charmander");
    cy.get(".btn-guardar").should("not.to.be.disabled");
    cy.get(".btn-guardar").click();
    cy.get('.mensaje').contains("Pokemon actualizado correctamente")
  });
  it("Eliminando pokemon", () => {
    cy.get(":nth-child(1) > :nth-child(5) > :nth-child(2) > .bi > path").click({
      force: true,
    });
    cy.on("window:confirm", (text) => {
      expect(text).to.contains("Desea eliminar este pokemon?");
    });
  });
  it("Buscando pokemon", () => {
    cy.get(".buscador").type("Charmander");
    cy.get("tbody>tr").eq(0).contains("Charmander");
  });
});
