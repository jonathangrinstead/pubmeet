class Meet < ApplicationRecord
  has_many :participants, dependent: :destroy

  before_create :generate_slug

  validates :decision_deadline, presence: true,
    comparison: { greater_than: -> { Time.current }, message: "must be in the future" }

  validates :slug, uniqueness: true

  def generate_slug
    self.slug = nil if self.slug.blank?
    self.slug ||= loop do
      token = SecureRandom.hex(5)
      break token unless Meet.exists?(slug: token)
    end
  end

  def to_param
    slug
  end
end
