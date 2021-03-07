import requests
import re
from bs4 import BeautifulSoup
#from urllib.request import Request, urlopen


def scrape():
    url = 'https://www.alltrails.com/hong-kong'
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36'}
    result = requests.get(url, headers=headers).text
    soup = BeautifulSoup(result, 'lxml')
    trail_names = soup.find('div', class_='styles-module__results___24LBd').find_all('div', class_='xlate-none styles-module__name___3T41O undefined')
    for trail in trail_names:
        print(trail.text)

def trail_scrape():
    with open('trailsData/trails.html', encoding="utf-8") as html_file:
        soup = BeautifulSoup(html_file, 'lxml')
        #print(soup.prettify())
        trail_names = soup.find('div', class_='styles-module__results___24LBd').find_all('div',class_='xlate-none styles-module__name___3T41O undefined')
        #for trail in trail_names:
            #print(trail.text)
        trail_cards = soup.find('div', class_='styles-module__results___24LBd')
        #trail_cards = trail_result.find_all('div', class_='styles-module__container___10uYZ styles-module__trailCard___2oHiP')
        #print(len(trail_result))
        trails = []
        for card in trail_cards:
            #trail_card = card.find('div', class_='styles-module__container___10uYZ styles-module__trailCard___2oHiP').text
            #print(trail_card)
            #print(card.find('div', class_='slick-slide slick-active slick-current').div.div)
            #print(image.split(", url")[1].split(";")[0])
            #trails.append(trail_card)
            trail = {}
            trail['name'] = card.find('div', class_='xlate-none styles-module__name___3T41O undefined').text
            trail['location'] = card.find('a', class_='xlate-none styles-module__location___11FHK styles-module__info___1Mbn6 styles-module__link___3T9FO').text
            trail['difficulty'] = card.find('div', class_='styles-module__info___1Mbn6 styles-module__thin___3YRdx').span.text
            distlen = card.find_all('div', class_='styles-module__info___1Mbn6')[1].find_all('span', class_='xlate-none')
            trail['duration'] = ''
            trail['image'] = ''
            if(len(distlen) == 2):
                trail['length'] = distlen[0].text.split(": ")[1]
                trail['duration'] = distlen[1].text
            else:
                trail['length'] = distlen[0].text.split(": ")[1]
            image = card.find('div', class_='slick-slide slick-active slick-current')
            if image is not None:
                style = image.div.div['style']
                image_url = style.split(", url")[1].split(";")[0]
                if "/api" in image_url:
                    index = 1
                    image_not_found = False
                    next_image = card.find('div', class_="slick-track").find('div', {'class': 'slick-slide', 'data-index': index}).div.div['style']
                    #print("url" not in next_image)
                    while("url" not in next_image):
                        index+=1
                        next_image = card.find('div', class_="slick-track").find('div', {'class': 'slick-slide','data-index': index}).div.div['style']
                        if(index == 5):
                            image_not_found = True
                            break
                    if(image_not_found == False):
                        next_image_url = next_image.split(", url")[1].split(";")[0]
                        trail['image'] = next_image_url
                    else: trail['image'] = ''
                    #if trail['name'] == '#39 - Tai Tam Tuk Reservoir to Quarry Bay':
                        #next_image = card.find('div', class_="slick-track").find('div', {'class': 'slick-slide', 'data-index': 2})
                        #print(next_image)
                        #print(next_image.split(", url"))
                    #next_image_url = next_image.split(", url")[1].split(";")[0]
                    #trail['image'] = next_image_url
                    #print(trail['name'])
                    #next_image_url = next_image.split(", url")[1].split(";")[0]
                    #if(len(next_image) != 2):
                        #print(trail['name'])
                    #trail['image'] = next_image_url
                else:
                    trail['image'] = image_url

            trails.append(trail)
        return trails

# # Press the green button in the gutter to run the script.
# if __name__ == '__main__':
#     #print_hi('PyCharm')
#     trails = trail_scrape()
#     print(trails)
# # See PyCharm help at https://www.jetbrains.com/help/pycharm/
