class AUser < ApplicationRecord
    has_many :joinauts
    has_many :tabs, through: :joinauts

    #Validations
    validates :email, presence: true
    validates :email, format: { with: 
    URI::MailTo::EMAIL_REGEXP }
end
