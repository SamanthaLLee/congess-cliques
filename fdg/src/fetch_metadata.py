import requests
import csv


def clean_data():
    count = 0
    with open('fdg/src/fb-pages-politician/fb-pages-politician-nodes.csv', 'r') as nodes:
        with open('fdg/src/fb-pages-politician/fb-pages-politician-nodes-clean.csv', 'w') as results:
            reader = csv.reader(nodes)
            writer = csv.writer(results)

            writer.writerow(next(reader, []))

            for r in enumerate(csv.reader(nodes)):
                name = r[1][1]
                if name.isascii():
                    writer.writerow(r[1])
                    count += 1
    print(count)


def filter_congress():  # 147

    headers = {'X-API-Key': 'E0rlb93H2bnuaUFQ3091VsWZ8Mlc9WZfZCv1Ymay'}
    politiciansadded = set()
    numsessions = 10
    currsession = 117

    # write new file
    with open('fdg/src/fb-pages-politician/fb-pages-politician-nodes-clean-filtered.csv', 'w') as results:
        writer = csv.writer(results)
        writer.writerow(['id'] + ['name'] + ['new_id'] + ['party'])

        for _ in range(numsessions):
            s = requests.get(
                'https://api.propublica.org/congress/v1/' +
                str(currsession)+'/senate/members.json', headers=headers)
            senatedata = s.json()

            h = requests.get(
                'https://api.propublica.org/congress/v1/' +
                str(currsession)+'/house/members.json', headers=headers)
            housedata = h.json()

            # loop through all members of senate
            for politician in senatedata["results"][0]["members"]:
                fullname = politician["first_name"] + \
                    " " + politician["last_name"]
                fullnamewithmid = None
                fullnamewithmidinit = None
                if politician["middle_name"]:
                    fullnamewithmid = politician["first_name"] + " " + \
                        politician["middle_name"] + \
                        " " + politician["last_name"]
                    fullnamewithmidinit = politician["first_name"] + " " + \
                        politician["middle_name"][0] + \
                        ". " + politician["last_name"]

                if fullname in politiciansadded or fullnamewithmid in politiciansadded:
                    continue

                # check if curr name in nodes csv
                with open('fdg/src/fb-pages-politician/fb-pages-politician-nodes-clean.csv', 'r') as nodes:
                    for r in enumerate(csv.reader(nodes)):
                        if fullname in r[1][1]:
                            politiciansadded.add(fullname)
                            writer.writerow(r[1] + [politician["party"]])
                            break
                        elif fullnamewithmid:
                            if fullnamewithmid in r[1][1] or fullnamewithmidinit in r[1][1]:
                                politiciansadded.add(fullnamewithmid)
                                writer.writerow(r[1] + [politician["party"]])
                                break

            # loop through all members of house
            for politician in housedata["results"][0]["members"]:
                fullname = politician["first_name"] + \
                    " " + politician["last_name"]
                fullnamewithmid = None
                fullnamewithmidinit = None
                if politician["middle_name"]:
                    fullnamewithmid = politician["first_name"] + " " + \
                        politician["middle_name"] + \
                        " " + politician["last_name"]
                    fullnamewithmidinit = politician["first_name"] + " " + \
                        politician["middle_name"][0] + \
                        ". " + politician["last_name"]

                if fullname in politiciansadded or fullnamewithmid in politiciansadded:
                    continue

                # check if curr name in nodes csv
                with open('fdg/src/fb-pages-politician/fb-pages-politician-nodes-clean.csv', 'r') as nodes:
                    for r in enumerate(csv.reader(nodes)):
                        if fullname in r[1][1]:
                            politiciansadded.add(fullname)
                            writer.writerow(r[1] + [politician["party"]])
                            break
                        elif fullnamewithmid:
                            if fullnamewithmid in r[1][1] or fullnamewithmidinit in r[1][1]:
                                politiciansadded.add(fullnamewithmid)
                                writer.writerow(r[1] + [politician["party"]])
                                break
            currsession -= 1


if __name__ == "__main__":
    print("1: Clean data")
    print("2: Filter congress")
    option = input("Enter 1 or 2: ")

    if(option == '1'):
        clean_data()
    elif(option == '2'):
        filter_congress()
