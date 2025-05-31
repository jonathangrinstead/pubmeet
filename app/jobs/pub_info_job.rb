class PubInfoJob < ApplicationJob
  queue_as :default

  def perform(meet_id)
    meet = Meet.find(meet_id)
    sms_service = SmsService.new
    meet.participants.each do |participant|
      sms_service.send_sms(participant.phone_number, "🍻 #{participant.name} has invited you to join their pub meet! Join us at: #{meet.slug}")
    end
  end
end