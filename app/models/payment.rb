class Payment < ApplicationRecord
    #Associations
    belongs_to :user
    belongs_to :tab
    has_many :joinups
    has_many :debts
    has_many :users, through: :debts

    #Validations
    validates :description, presence: true

    def debts_add_up?
        if self.debts.sum(:amount) != self.amount
            self.errors.add(:amount, "the debts need to add up to the total")
            false
        else
            true
        end
    end
end
