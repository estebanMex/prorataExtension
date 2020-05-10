function prorataCalculator() {
    return {
        expense: null,
        totalIncomes: null,
        partners: {
            partner1: {
                name: null,
                amount: null,
                percentage: null,
                given: null,
                kept: null
            },
            partner2: {
                name: null,
                amount: null,
                percentage: null,
                given: null,
                kept: null
            }
        },

        onInput: function ($evt) {
            const triggeredElementName = $evt.target.name;
            console.log(triggeredElementName);
            switch (triggeredElementName) {
                case 'expenses':
                    this.updateExpenses($evt, triggeredElementName);
                    break;
                case 'partner1':
                case 'partner2':
                    this.updateInfosPartners($evt, triggeredElementName);
                    break;
                case 'income1':
                    this.updateIncome($evt, 'partner1');
                    break;
                case 'income2':
                    this.updateIncome($evt, 'partner2');
                    break;

                default:
                    break;
            }

            if (this.expense && this.partners.partner1.amount && this.partners.partner2.amount) {
                var summary = this.calculate(
                    this.partners.partner1.amount,
                    this.partners.partner2.amount,
                    this.expense
                );
                this.$refs.summary.innerText = summary;
            }

        },
        updateExpenses: function ($evt, triggeredElementName) {
            this.expense = $evt.target.value ? parseFloat($evt.target.value) : 0;
        },
        updateInfosPartners: function ($evt, triggeredElementName) {
            this.partners[triggeredElementName].name = $evt.target.value ? $evt.target.value : triggeredElementName;
        },
        updateIncome: function ($evt, triggeredElementName) {
            this.partners[triggeredElementName].amount = $evt.target.value ? parseFloat($evt.target.value) : 0;
        },
        pourcentageByPartner: function (incomePartner, totalIncomesPartners) {
            return (incomePartner * 100 / totalIncomesPartners).toFixed(2);
        },
        giventByPartner: function (percentagePartner, totalIncomesPartners) {
            return Math.floor(totalIncomesPartners * (percentagePartner / 100));
        },
        calculate: function (salaryPartner1 = 0, salaryPartner2 = 0, requestedTotal = 0) {
            this.expense = requestedTotal;
            this.totalIncomes = salaryPartner1 + salaryPartner2;

            this.partners.partner1.percentage = this.pourcentageByPartner(salaryPartner1, this.totalIncomes);
            this.partners.partner2.percentage = this.pourcentageByPartner(salaryPartner2, this.totalIncomes);

            this.partners.partner1.given = this.giventByPartner(this.partners.partner1.percentage, this.expense);
            this.partners.partner2.given = this.giventByPartner(this.partners.partner2.percentage, this.expense);

            this.partners.partner1.kept = salaryPartner1 - this.partners.partner1.given;
            this.partners.partner2.kept = salaryPartner2 - this.partners.partner2.given;

            return `${this.partners.partner2.name} doit laisser ${this.partners.partner2.given}€ (${this.partners.partner2.percentage}%) sur le compte commun et garder ${this.partners.partner2.kept}€ sur son compte personnel.
                
                ${this.partners.partner1.name} doit laisser ${this.partners.partner1.given}€ (${this.partners.partner1.percentage}%) sur le compte commun et garder ${this.partners.partner1.kept}€ sur son compte personnel.`;
        }
    }
}