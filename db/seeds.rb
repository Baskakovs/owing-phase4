# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# (1..5).each do |i|
#     Tab.create!(name: Faker::WorldCup.team)
# end

# (1..5).each do |i|
#     User.create!(name: Faker::Name.unique.name)
# end

(1..5).each do |i|
    payment = Payment.create!(user_id: rand(121..125), tab_id: 138, amount: rand(1..100), description: Faker::Lorem.sentence, category: Faker::Lorem.word)
    Debt.create!(payment_id: payment.id, user_id: rand(121..125), amount: rand(1..100))
    end
