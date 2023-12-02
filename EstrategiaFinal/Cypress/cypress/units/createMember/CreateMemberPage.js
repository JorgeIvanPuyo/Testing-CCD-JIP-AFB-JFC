

export class CreateMemberPage {
  constructor(cy) {
    if (!cy) {
      throw new Error("Es requerida la instancia de cypress");
    }
    this.cy = cy;
  }

  navigateToMembers() {
    cy.visit('/ghost/#/members');

}

getNewMemberButton() {
    return this.cy.contains('a', 'New member')

}
getMemberNameInput() {
    return this.cy.get('[data-test-input="member-name"]');
}
getMemberEmailInput() {
    return this.cy.get('[data-test-input="member-email"]');
}
getSaveButton() {
    return this.cy.get('span[data-test-task-button-state="idle"]').contains('Save');
}

getEmberPowerSelectInput() {
    return this.cy.get('.ember-power-select-trigger-multiple-input');
}

getMemberNoteTextarea() {
    return this.cy.get('textarea.gh-member-details-textarea');
}
getMembersBackLink() {
    return this.cy.get('a[data-test-link="members-back"]');
}
getStayButton() {
    return this.cy.get('button[data-test-stay-button]');
}

getLeaveButton() {
    return this.cy.get('button[data-test-leave-button]');
}

memberExists(memberEmail) {
    return this.cy.get('table.gh-list').contains('tr', memberEmail).then($el => {
        return $el.length > 0;
    });
}

memberDoesNotExist(memberEmail) {
    return this.cy.get('table.gh-list').then($table => {
        // Si la tabla no contiene el email, pasa la aserción
        if ($table.find(`tr:contains('${memberEmail}')`).length === 0) {
            return true;
        } else {
            throw new Error("El miembro existe en la lista");
        }
    });
}

}