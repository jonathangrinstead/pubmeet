require 'securerandom'
class Meet < ApplicationRecord

  has_many :participants, dependent: :destroy

  before_create :generate_slug

  validates :decision_deadline, presence: true,
    comparison: { greater_than: -> { Time.current }, message: "must be in the future" }

  validates :slug, uniqueness: true, allow_nil: true, allow_blank: true

  def generate_slug
    if slug.blank? || slug.empty?
      self.slug = SecureRandom.hex(5)
    end
  end

  def to_param
    slug
  end
end
