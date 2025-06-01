class PubInfoJob < ApplicationJob
  queue_as :default

  def perform(meet_id)
    meet = Meet.find(meet_id)
    sms_service = SmsService.new
    message = generate_pub_info(meet)
    puts message
    meet.participants.each do |participant|
      sms_service.send_sms(participant.phone_number, "🍻 #{participant.name}, #{message}")
    end
  end

  def generate_pub_info(meet)
    chat = RubyLLM.chat(provider: :gemini, model: 'gemini-2.0-flash')
    locations = meet.participants.map(&:location).join(', ')
    puts "Locations: #{locations}"
    response = chat.ask("Choose a single pub that's convenient for people coming from these locations: #{locations}. Respond in this exact format: 'PubMeet has selected [PUB NAME] - [one sentence description] - [Google Maps link to pub - Do not shorten the link]'")
    response.content.to_s
  end
end