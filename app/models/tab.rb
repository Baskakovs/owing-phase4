class Tab < ApplicationRecord
    has_many :joinuts
    has_many :users , through: :joinuts
    has_many :payments
end
