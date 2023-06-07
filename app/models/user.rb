class User < ApplicationRecord
  #Associations
  has_secure_password
  has_many :joinuts
  has_many :tabs, through: :joinuts
  has_many :payments
  has_many :debts
  has_many :payment_debts, through: :debts, source: :payment

  PASSWORD_REQUIREMENTS = /\A
  (?=.{8,})          # Must contain 20 or more characters
  (?=.*\d)            # Must contain a digit
  (?=.*[a-z])         # Must contain a lowercase character
  (?=.*[A-Z])         # Must contain an uppercase character
  (?=.*[[:^alnum:]])  # Must contain a symbol
/x

  #Validations
  validates :name, presence: true
  validates :email, presence: true, uniqueness: true, format: { with: 
  URI::MailTo::EMAIL_REGEXP }
  validates :password, presence: true, format: { with: PASSWORD_REQUIREMENTS, 
  message: "must contain at least 8 characters, 1 number, 1 uppercase, 1 
  speacial character" }
end