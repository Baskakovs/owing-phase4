class Payment < ApplicationRecord
    #Associations
    belongs_to :user
    belongs_to :tab
    has_many :joinups
    has_many :debts
    has_many :users, through: :debts

    #Validations
    validates :description, presence: true
end
