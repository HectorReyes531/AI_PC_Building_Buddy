import http.server
import cgi
import json
import subprocess
import sys
import os
import openai

class MyHttpRequestHandler(http.server.BaseHTTPRequestHandler):
    def do_POST(self):
        if self.path == '/execute_sc}ript':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length).decode('utf-8')
            parsed_data = cgi.parse_qs(post_data)
            prompt = parsed_data['prompt'][0]
            response = AI_PC_Buddy(prompt)
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'response': response}).encode('utf-8'))

def  AI_PC_Buddy(prompt):
    messages = [{'role': 'user', 'content': prompt}]
    
    response = client.chat.completions.create(
        model='gpt-3.5-turbo',
        messages=messages
    )
    return response.choices[0].message.content.strip()

def install(library):
    subprocess.check_call([sys.executable, "-m", "pip", "install", library])

def run(server_class=http.server.HTTPServer, handler_class=MyHttpRequestHandler):
    server_address = ('', 8000)
    httpd = server_class(server_address, handler_class)
    httpd.serve_forever()

if __name__ == '__main__':
    install('openai')
    openai.api_key = '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'
    run()



# import subprocess
# import sys
# import json
# import cgi

# def install(library):
#     subprocess.check_call([sys.executable, "-m", "pip", "install", library])

# install('openai')

# import openai
# from openai import OpenAI

# # Set up OpenAI API key
# openai.api_key = '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'


# client = OpenAI(
#     # This is the default and can be omitted
#     api_key='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',
# )

# def  AI_PC_Buddy(prompt):
#     messages = [{'role': 'user', 'content': prompt}]
    
#     response = client.chat.completions.create(
#         model='gpt-3.5-turbo',
#         messages=messages
#     )
#     return response.choices[0].message.content.strip()

# # Process CGI input and output
# form = cgi.FieldStorage()
# prompt = form.getValue('prompt', '')

# response = AI_PC_Buddy(prompt)

# print("Content-type: application/json\n")
# print(json.dumps({'response': response}))


# close_program = ['quit', 'exit', 'bye', 'later']

# while True:
#     user_input = input('You: ')
#     if user_input.lower() in close_program:
#         break

#     response =  AI_PC_Buddy(user_input)
#     print(f'AI PC Buddy:  {response}')



# csv_dataframes = [case_accessory_csv_file_path, case_csv_file_path, 
#                   cpu_cooler_csv_file_path, cpu_csv_file_path, 
#                   external_hard_drive_csv_file_path, fan_controller_csv_file_path, headphones_csv_file_path,
#               internal_hard_drive_csv_file_path, keyboard_csv_file_path, memory_csv_file_path, monitor_csv_file_path, motherboard_csv_file_path,
#               mouse_csv_file_path, optical_drive_csv_file_path, os_csv_file_path, power_supply_csv_file_path, sound_card_csv_file_path,
#               speakers_csv_file_path, thermal_paste_csv_file_path, ups_csv_file_path, video_card_csv_file_path, webcam_csv_file_path, 
#               wired_network_card_csv_file_path, wireless_network_card_csv_file_path]

# # print(csv_dataframes)
# json_datasets = {}

# for df in csv_dataframes:
#     dataframes = pd.read_csv(df)
#     name = [v for v in globals() if globals()[v] is df][0]
#     json_datasets[name] = json.loads(dataframes.to_json(orient='records'))
    
# # Load Component Data
# def load_component_data(csv_file_path):
#     return pd.read_csv(csv_file_path)

# # Filter Components Based on Criteria
# def filter_components(df, criteria):
#     return df[df['price'] <= criteria['budget']]

# # Select Components
# def select_components(df):
#     return df.sample()

# # Define Criteria Classes or Dictionaries
# # Define Criteria Classes or Dictionaries
# criteria = {
#     "gaming": {"budget": 1500},
#     "light use": {"budget": 800},
#     "office work": {"budget": 1500},
#     "video editing": {"budget": 2000},
#     "graphic design": {"budget": 1800},
#     "music production": {"budget": 1700},
#     "programming": {"budget": 1400},
#     "3D modeling": {"budget": 2200},
#     "photo editing": {"budget": 1600},
#     "content creation": {"budget": 1900},
#     "web browsing": {"budget": 1000},
#     "multimedia consumption": {"budget": 1200},
#     "virtualization": {"budget": 2500},
#     "data analysis": {"budget": 2100},
#     "CAD": {"budget": 2300},
#     "machine learning": {"budget": 2800},
#     "gaming and streaming": {"budget": 2000},
#     "business": {"budget": 1800},
#     "school work": {"budget": 1000},
#     "casual gaming": {"budget": 1200},
#     "office": {"budget": 1400}
# }

# # Define a function to select PC components based on user criteria
# def select_pc_components(user_criteria):
#     component_paths = {
#         "CASE_ACCESSORY": case_accessory_csv_file_path,
#         "CASE": case_csv_file_path,
#         "CPU_COOLER": cpu_cooler_csv_file_path,
#         "CPU": cpu_csv_file_path,
#         "EXTERNAL_HARD_DRIVE": external_hard_drive_csv_file_path,
#         "FAN_CONTROLLER": fan_controller_csv_file_path,
#         "HEADPHONES": headphones_csv_file_path,
#         "INTERNAL_HARD_DRIVE": internal_hard_drive_csv_file_path,
#         "KEYBOARD": keyboard_csv_file_path,
#         "MEMORY": memory_csv_file_path,
#         "MONITOR": monitor_csv_file_path,
#         "MOTHERBOARD": motherboard_csv_file_path,
#         "MOUSE": mouse_csv_file_path,
#         "OPTICAL_DRIVE": optical_drive_csv_file_path,
#         "OS": os_csv_file_path,
#         "POWER_SUPPLY": power_supply_csv_file_path,
#         "SOUND_CARD": sound_card_csv_file_path,
#         "SPEAKERS": speakers_csv_file_path,
#         "THERMAL_PASTE": thermal_paste_csv_file_path,
#         "UPS": ups_csv_file_path,
#         "VIDEO_CARD": video_card_csv_file_path,
#         "WEBCAM": webcam_csv_file_path,
#         "WIRED_NETWORK_CARD": wired_network_card_csv_file_path,
#         "WIRELESS_NETWORK_CARD": wireless_network_card_csv_file_path
#     }


#     selected_components = {}
#     for component, path in component_paths.items():
#         data_frame = load_component_data(path)
#         filtered_components = filter_components(data_frame, user_criteria)
#         selected_components[component] = select_components(filtered_components)
#     return selected_components

# # Input User Criteria
# user_input = str(input('Specify Criteria: '))
# user_criteria = criteria[user_input]  # Change to "light use" for different criteria

# # Select PC Components based on User Criteria
# selected_pc_components = select_pc_components(user_criteria)

# # Output Selected Components
# for component, data in selected_pc_components.items():
#     print(f"{component}:")
#     print(data)
#     print(searchProduct(data))
#     print("\n")