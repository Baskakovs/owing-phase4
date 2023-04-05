class AUser < ApplicationRecord
    has_many :joinauts
    has_many :tabs, through: :joinauts
end
