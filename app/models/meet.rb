require 'securerandom'
class Meet < ApplicationRecord
  SLUG_REGEX = /\A[a-z0-9]+(?:-[a-z0-9]+)*\z/

  has_many :participants, dependent: :destroy

  before_create :generate_slug
  before_validation :normalize_slug

  validates :decision_deadline, presence: true,
    comparison: { greater_than: -> { Time.current }, message: "must be in the future" }

  validates :slug, uniqueness: true, allow_nil: true, allow_blank: true,
    format: { with: SLUG_REGEX, message: "must be lowercase letters, numbers, and dashes only" }

  def normalize_slug
    return if slug.nil?

    normalized = slug.to_s.strip.downcase
    self.slug = normalized.presence
  end

  def generate_slug
    self.slug = SecureRandom.hex(5) if slug.blank?
  end

  def to_param
    slug
  end
end
