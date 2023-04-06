class Tab < ApplicationRecord
    #Associations
    has_many :joinuts
    has_many :users , through: :joinuts
    has_many :payments
    has_many :joinauts
    has_many :a_users , through: :joinauts

    #Validations
    validates :name, presence: { message: "Tab name cannot be blank" }

end
