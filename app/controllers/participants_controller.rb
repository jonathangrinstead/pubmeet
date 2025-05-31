class ParticipantsController < ApplicationController
  before_action :set_meet

  def new
    @participant = Participant.new
  end

  def create
    @participant = Participant.new(participant_params)
    @participant.meet = @meet
    
    if @participant.save
      render json: { 
        name: @participant.name,
        status: 'success'
      }, status: :ok, content_type: 'application/json'
    else
      render json: { 
        error: "Something went wrong",
        status: 'error'
      }, status: :unprocessable_entity, content_type: 'application/json'
    end
  end

  private

  def set_meet
    @meet = Meet.find_by!(slug: params[:meet_slug])
  end

  def participant_params
    params.require(:participant).permit(:name, :location, :vibe, :phone_number)
  end
end