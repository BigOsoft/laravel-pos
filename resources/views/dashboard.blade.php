<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Dashboard') }}
        </h2>
    </x-slot>
    @php
        $poss = json_decode($poss);
        $render_form = True;
        if(isset($_POST['SubmitButton'])){ //check if form was submitted
            $input = $_POST['posLocation']; //get input text
            echo $input;
            $render_form = False;
        }   
    @endphp
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                @if($render_form)
                <div class="p-6 bg-white border-b border-gray-200">
                    You're logged in!<br><br>
                    <form method="post" action="/public/report">
                        {{ csrf_field() }}
                        <div class="inline-block relative w-64">
                            <select name="posLocation" class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                            @php
                                foreach($poss as $pos) {
                                    echo '<option value="'.$pos->pos_id.'">['.$pos->pos_id.'] '.$pos->store.' ('.$pos->address_one.' '.$pos->address_two.')</option>';
                                }
                            @endphp
                            </select>
                            <p class="text-gray-600 text-xs italic">Please select the POS location</p>
                        </div>
                        <br>
                        <div class="text-center">
                            <input type="submit" name="submitbtn" value="View Report" style="background-color: #2b6cb0;" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" />
                        </div>
                    </form>
                </div>
                @endif
            </div>
        </div>
    </div>
</x-app-layout>
