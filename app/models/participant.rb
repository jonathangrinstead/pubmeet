class Participant < ApplicationRecord
  VIBE_OPTIONS = ["Cheap and Cheerful", "Classy", "Sports", "Quiet", "Dance"].freeze

  belongs_to :meet

  before_validation :normalize_phone_number

  validates :name, presence: true, length: { maximum: 80 }
  validates :location, presence: true, length: { maximum: 120 }
  validates :vibe, inclusion: { in: VIBE_OPTIONS }, allow_blank: true
  validates :phone_number, format: { with: /\A\+?\d{10,15}\z/ }, allow_blank: true

  private

  def normalize_phone_number
    return if phone_number.blank?

    raw = phone_number.to_s.strip
    leading_plus = raw.start_with?("+")
    digits = raw.gsub(/\D/, "")
    self.phone_number = leading_plus ? "+#{digits}" : digits
  end
end
