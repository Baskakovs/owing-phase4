class User < ApplicationRecord
    has_secure_password
    has_many :joinuts
    has_many :tabs, through: :joinuts
    has_many :payments
    has_many :debts
    has_many :payment_debts, through: :debts, source: :payment
end