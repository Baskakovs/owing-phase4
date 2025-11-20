class User < ApplicationRecord
  #Associations
  has_secure_password
  has_many :joinuts
  has_many :tabs, through: :joinuts
  has_many :payments
  has_many :debts
  has_many :payment_debts, through: :debts, source: :payment

  PASSWORD_REQUIREMENTS = /\A(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}\z/

  #Validations
  validates :name, presence: true
  validates :email, presence: true, uniqueness: true, format: { with: 
  URI::MailTo::EMAIL_REGEXP }
  validates :password, presence: true, format: { with: PASSWORD_REQUIREMENTS, 
  message: "must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character" }
end