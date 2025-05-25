class CreateParticipants < ActiveRecord::Migration[8.0]
  def change
    create_table :participants do |t|
      t.string :name
      t.string :location
      t.string :vibe
      t.string :phone_number
      t.references :meet, null: false, foreign_key: true

      t.timestamps
    end
  end
end
