i=0
while (( i <= 11 ));
do 
    node scrape-reviews.js $i
    #echo $i

    sleep 5

    i=$((i+1))
done