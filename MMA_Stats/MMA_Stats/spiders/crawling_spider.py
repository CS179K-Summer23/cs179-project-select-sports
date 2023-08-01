#reference: https://www.youtube.com/watch?v=m_3gjHGxIJc

#compile line: scrapy crawl MMACrawler -o ufc_fighters.json

import scrapy
from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor

class MMACrawler(CrawlSpider):
    name = "MMACrawler" #identifier
    allowed_domains = ['ufcstats.com']
    #start_urls = ['http://ufcstats.com/statistics/fighters']
    start_urls = [f'http://ufcstats.com/statistics/fighters?char={char}' for char in 'abcdefghijklmnopqrstuvwxyz']

    #crawl
    rules = (
        Rule(LinkExtractor(allow="ufcstats"), callback="parse"), 
    )

    #modified based on Chatgpt generated code
    def parse(self, response):
        for fighter_link in response.css('.b-link_style_black::attr(href)').getall():
            yield scrapy.Request(fighter_link, callback=self.parse_fighter)

    def parse_fighter(self, response):
        name = response.css('.b-content__title-highlight::text').get().strip()
        weight = response.xpath('//i[contains(text(), "Weight:")]/following-sibling::text()').get().strip()
        record = response.css('.b-content__title-record::text').get().strip()
        nickname = response.css('.b-content__Nickname::text').get().strip()

        #fight_history = []
        #fights = response.css('.b-fight-details__table-text')
        #for fight in fights:
        #    result = fight.css('.b-flag__text::text').get().strip()
        #    opponent = fight.css('a.b-link_style_black::text').get().strip()
        #    fight_history.append({'result': result, 'opponent': opponent})

        #fight_history = []
        #for flag, opponent in zip(response.css('.b-flag__text::text').getall(),
        #                          response.css('.b-link_style_black::text').getall()):
        #    fight_history.append({'flag': flag.strip(), 'opponent': opponent.strip()})

        result = {
            'name': name,
            'record': record,
            'Nickname': nickname,
            'weight': weight,
            #'Fight History': fight_history
        }

        yield result