class Debt < ApplicationRecord
    #Associations
    belongs_to :user
    belongs_to :payment
end
