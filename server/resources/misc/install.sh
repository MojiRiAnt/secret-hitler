#!/bin/bash
# This script is importing the game server from GitHub.
# It automatically handles the virtual environment management.

echo "NOTE: The script is going to import project here!"
read -p "Does current working directory suit you? (y/n) " ANSWER
if [[ $ANSWER != "y" ]] && [[ $ANSWER != "Y" ]]
then
    exit 1
fi


echo -e "\e[5mPreparing your virtual environment...\e[0m"
python3 -m venv secret-hitler-env
source secret-hitler-env/bin/activate
EXPECTED_ENV=$(pwd)"/secret-hitler-env"
if [[ $VIRTUAL_ENV == $EXPECTED_ENV ]]
then
    echo -ne "\e[1A\e[K\r\e[1;92mEnvironment prepared successfully!\e[0m\n"
else
    echo -ne "\e[1;31mThere was an error while entering the virtual environment.\e[0m\n"
    deactivate
    rm -Rf secret-hitler-env
    exit 1
fi

cd secret-hitler-env
git clone https://github.com/MojiRiAnt/secret-hitler.git

cd secret-hitler
pip3 install -r server/resources/misc/requirements.txt

echo ""
echo -e "\e[1;92mScript finished successfully!\e[0m"
echo -e "\e[1mNOTE: To remove the project, simply remove the secret-hitler-env directory.\e[0m"
