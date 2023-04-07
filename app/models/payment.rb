class Payment < ApplicationRecord
    #Associations
    belongs_to :user
    belongs_to :tab
    has_many :joinups
    has_many :debts
    has_many :users, through: :debts

    #Validations
    validates :description, presence: true

    def debts_add_up?(amount, debts)
        if amount.to_f.floor != debts.map{|debt| debt[:amount].to_f}.sum.floor
            self.errors.add(:amount, "the debts need to add up to the total")
            false
        else
            true
        end
    end
end
