class Joinut < ApplicationRecord
    #Associations
    belongs_to :user
    belongs_to :tab
end