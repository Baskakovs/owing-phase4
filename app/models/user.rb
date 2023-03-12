class User < ApplicationRecord
    has_secure_password

    has_many :joinuts
    has_many :tabs , through: :joinuts
    has_many :payments
end
