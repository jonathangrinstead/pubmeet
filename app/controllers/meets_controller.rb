class MeetsController < ApplicationController

  def show
    @emoji = ['🍺', '🍻', '🍷', '🍸', '🍹', '🍾', '🍷', '🍸', '🍹', '🍾']
    @meet = Meet.find_by!(slug: params[:slug])
  end

  def new
    @meet = Meet.new
    @participant = Participant.new
  end

  def create
    @meet = Meet.new(meet_params)
    @participant = Participant.new(participant_params)
    @participant.meet = @meet 
    
    if @meet.save && @participant.save
      redirect_to meet_path(@meet.slug), notice: 'Your PubMeet room is ready! 🍻'
    else
      flash.now[:alert] = "Something went wrong. Please try again."
      render :new
    end
  end

  private

  def meet_params
    params.require(:meet).permit(:decision_deadline, :slug)
  end

  def participant_params
    params.require(:participant).permit(:name, :location, :vibe, :phone_number)
  end
end
