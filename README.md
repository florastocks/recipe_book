<!-----

Yay, no errors, warnings, or alerts!

Conversion time: 0.414 seconds.


Using this Markdown file:

1. Paste this output into your source file.
2. See the notes and action items below regarding this conversion run.
3. Check the rendered output (headings, lists, code blocks, tables) for proper
   formatting and use a linkchecker before you publish this page.

Conversion notes:

* Docs to Markdown version 1.0β33
* Mon Oct 17 2022 09:49:07 GMT-0700 (PDT)
* Source doc: Recipe README
----->


**<span style="text-decoration:underline;">Recipe App</span>**

** **

**Goal and Timeframe**


  ·  	Timeframe: 7 days

  ·  	Use a Python Django API using Django REST Framework to serve your data from a Postgres database

  ·  	Consume your API with a separate front-end build with React

  ·  	Be a complete product which most likely means multiple relationships and CRUD functionality for at least a couple of models

  ·  	Implement thoughtful user stories/wireframes that are significant enough to help you know which features are core MVP and which you can cut

  ·   Have a visually impressive design

  ·   Be deployed online
 

**You can access the deployed version**[ here](https://recipe-app-by-flora.herokuapp.com/).

[![recipe1.png](https://i.postimg.cc/J47DWcL3/recipe1.png)](https://postimg.cc/XXh7f5XX)

**Overview and concept:**

My Recipe App is a platform on which users can review recipes. The app allows users to register and login; view a range of recipes, as well and getting a more detailed view of individual recipes, their ingredients, method, and reviews.

 

**Technologies Used**


        ·  	HTML, CSS, SASS

        ·  	Django

        ·  	PostgreSQL

        ·  	Python

        ·  	JWT tokens

        ·  	Axios

        ·  	Git/Github

        ·  	React.js

        ·  	JavaScript


     

**Functionality**
Users can:


      -   	Register and Login

      -   	View a range of Recipes

      -   	View individual Recipes

      -   	Create a Review

      -   	Update their Review

      -   	Delete their Review

** **

**Planning**

I created an Entity Relationship Diagram (ERD) to map out the different relationships within my database:
[![recipe-ERD.png](https://i.postimg.cc/kgv7MLvB/recipe-ERD.png)](https://postimg.cc/WdzBXWKv)

Next, I began to sketch up how I wished my app to appear, the different components and pages I would need to achieve this. Here are my wireframes for some of the different pages

**Login and** **Register:**
[![loginrecipe.png](https://i.postimg.cc/hjPvqKFD/loginrecipe.png)](https://postimg.cc/94KCd5FK)

**Recipes page:**

[![recipes3.png](https://i.postimg.cc/hGCzvX1z/recipes3.png)](https://postimg.cc/bGtNFNMp)

**Single Recipe page, and Create Review:**
[![recipe4.png](https://i.postimg.cc/6pM5LD2F/recipe4.png)](https://postimg.cc/bZ2hqVRR)

I began creating the backend by building my different models, views and serializers. I Use Django and Django REST Framework to create a PostgreSQL database with RESTful features. I had in total 4 models: User; Food types; Recipe; Review. I found using Django was straightforward, and an efficient way of creating a PostgreSQL database, and used TablePlus to view my database, and Insomnia to test out my endpoints, and ensure they were working correctly. It did not take me long to have all my backend requests and CRUD functionality of reviews working.

```
class ReviewListView(APIView):
  permission_classes = (IsAuthenticatedOrReadOnly, )

  def post(self, request):
    request.data['owner'] = request.user.id
    review_to_create = ReviewSerializer(data=request.data)
    print('owner ->', request.user.id)
    try:
      
      review_to_create.is_valid(True) 
      review_to_create.save()
      return Response(review_to_create.data, status=status.HTTP_201_CREATED)
    except Exception as e:
      print(e)
      return Response(e.__dict__ if e.__dict__ else str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)
```
```
class ReviewDetailView(APIView):
  permission_classes = (IsAuthenticatedOrReadOnly, )

  def get_review(self, pk):
    try: 
      return Review.objects.get(pk=pk)
    except Review.DoesNotExist:
      raise NotFound("Review was not found!")

  def delete(self, request, pk):
    review_to_delete = self.get_review(pk=pk)
    print("Review Owner -> ", review_to_delete.owner.id)
    print("Request user id -> ", request.user)

    if review_to_delete.owner != request.user:
      raise PermissionDenied("Unauthorised")

    review_to_delete.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
  
  def put(self, request, pk):
    request.data['owner'] = request.user.id
    review_to_update = self.get_review(pk=pk)
    updated_review = ReviewSerializer(review_to_update, data=request.data)
    try:
      updated_review.is_valid(True)
      updated_review.save()
      return Response(updated_review.data, status=status.HTTP_202_ACCEPTED)
    except Exception as e:
      print(e)
      return Response(str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)
```

By day four my backend had been completed and tested, and so I moved onto my front-end. I created the basic front-end components quickly: Home; Register, Login, all recipes, single recipe. I used Axios to request the data from the back-end and react-router-dom to navigate from page to page. I later added the register and login pages, and connected them to the backend with little trouble.

```
useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/recipes/')
        // console.log(data)
        setAllRecipes(data)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])
  ```

At this point, I had realised that I had majorly underestimated the time it would take me to connect my back and front end together, with the exception of the register and login. I had created the endpoints in the backend that allow me to create, update, and delete recipes, but knew I had run out of time to get these to be fully functional in the front end. And so, to complete the project in the time I was given, I had to narrow my focus to just making sure my CRUD functionality for reviews worked on the front-end.

 

**Styling:**

Having underestimated the time, it would take me to connect my CRUD functionality on the front-end, I had not left myself as much time as I anticipated for styling. This being said, I am very confident using Flexbox, creating responsive pages, and using Bootstrap. I used styling of my app as a way of destressing when I felt under the most pressure.

[![recipestyle.png](https://i.postimg.cc/qMt9ZS59/recipestyle.png)](https://postimg.cc/KR2q1qFN)
[![Rstyle2.png](https://i.postimg.cc/VshhM4k4/Rstyle2.png)](https://postimg.cc/HjQ31w57)
[![rstyle3.png](https://i.postimg.cc/sgd0HXSh/rstyle3.png)](https://postimg.cc/nC2kCn3F)
[![rstyle4.png](https://i.postimg.cc/G3ZCrbGc/rstyle4.png)](https://postimg.cc/QVkPJGfP)
[![rstyle5.png](https://i.postimg.cc/859q1bFy/rstyle5.png)](https://postimg.cc/0MGtnD0m)

**Future improvements:**


    -   	Make CRUD functionality for adding updating and deleting the recipes.

        o   I have already written the endpoints for these functions in my code, and tested them in Insomnia to confirm they work. But I ran out of time to get them connected up to the front end in the timeframe I was given to finish this project.

    -   	Prepopulate the update review form – so that it has the orginal review to be updated, instead of being empty.

    - Add Error messages to the front end for failure to login or register.



**Key learnings**


    -   	Give myself more time to connect the front-end to the back-end.

    -   	Django

    -   	PostgreSQL

 
