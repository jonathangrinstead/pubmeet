class Meet < ApplicationRecord
  before_create :generate_slug

  def generate_slug
    self.slug = SecureRandom.hex(5)
  end
end
