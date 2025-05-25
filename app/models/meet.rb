class Meet < ApplicationRecord
  has_many :participants, dependent: :destroy
  before_create :generate_slug

  def generate_slug
    self.slug = SecureRandom.hex(5)
  end
end
