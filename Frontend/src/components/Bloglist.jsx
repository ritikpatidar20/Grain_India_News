import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogCard from './BlogCard'
import { BlogCardShimmer } from './BlogCardShimmer';
import{ BASE_URL} from "./helper";
// import './BlogList.css'; // Assuming you'll style your list here

const BlogList = () => {
    // Testing purpose as api dont give data
    // const blogList = [
    //     {
    //       _id: "1",
    //       heading: "The Benefits of Whole Grains",
    //       detail: "Whole grains are a great source  Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis est aliquam consequuntur laborum quidem possimus pariatur qui id. Aliquam error iure voluptatum facere incidunt omnis quam sapiente dolor possimus assumenda animi sit laborum nulla, odit iste beatae distinctio officiis saepe aspernatur laboriosam tenetur facilis neque accusamus eos? Ratione asperiores reprehenderit sunt porro quasi, vel magni fugit nihil, nesciunt, nostrum esse earum rem. Repellendus placeat nostrum, nemo fuga perferendis beatae est a. Totam ducimus impedit qui. Quos quam delectus quasi consequuntur voluptate inventore voluptatem aliquid vel nisi ex pariatur, voluptas eligendi aperiam laudantium molestias officiis velit. Pariatur ullam esse corrupti id. o fiber and essential nutrients .   They help in digestion, lower cholesterol levels, and reduce the risk of heart disease.",
    //       blogImage: "https://images.unsplash.com/photo-1536497711584-cb73b8133f01?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGdyYWlufGVufDB8fDB8fHww",
    //     },
    //     {
    //       _id: "2",
    //       heading: "Why You Should Eat Quinoa",
    //       detail: "Quinoa is a complete protein tha Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis est aliquam consequuntur laborum quidem possimus pariatur qui id. Aliquam error iure voluptatum facere incidunt omnis quam sapiente dolor possimus assumenda animi sit laborum nulla, odit iste beatae distinctio officiis saepe aspernatur laboriosam tenetur facilis neque accusamus eos? Ratione asperiores reprehenderit sunt porro quasi, vel magni fugit nihil, nesciunt, nostrum esse earum rem. Repellendus placeat nostrum, nemo fuga perferendis beatae est a. Totam ducimus impedit qui. Quos quam delectus quasi consequuntur voluptate inventore voluptatem aliquid vel nisi ex pariatur, voluptas eligendi aperiam laudantium molestias officiis velit. Pariatur ullam esse corrupti id. t contains all nine essential a mi  no acids. It's also rich in fiber, iron, and magnesium.",
    //       blogImage: "https://images.unsplash.com/photo-1716209235882-fed4b22f615a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njd8fGdyYWlufGVufDB8fDB8fHww",
    //     },
    //     {
    //       _id: "3",
    //       heading: "Oats: A Superfood for Breakfast",
    //       detail: "Oats are known for their heart-h Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis est aliquam consequuntur laborum quidem possimus pariatur qui id. Aliquam error iure voluptatum facere incidunt omnis quam sapiente dolor possimus assumenda animi sit laborum nulla, odit iste beatae distinctio officiis saepe aspernatur laboriosam tenetur facilis neque accusamus eos? Ratione asperiores reprehenderit sunt porro quasi, vel magni fugit nihil, nesciunt, nostrum esse earum rem. Repellendus placeat nostrum, nemo fuga perferendis beatae est a. Totam ducimus impedit qui. Quos quam delectus quasi consequuntur voluptate inventore voluptatem aliquid vel nisi ex pariatur, voluptas eligendi aperiam laudantium molestias officiis velit. Pariatur ullam esse corrupti id. ealthy benefits. They're a grea t   source of vitamins, minerals, and antioxidants.",
    //       blogImage: "https://plus.unsplash.com/premium_photo-1670839894361-90e9dcd3d2aa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzN8fGdyYWlufGVufDB8fDB8fHww",
    //     },
    //     {
    //       _id: "4",
    //       heading: "Brown Rice: A Staple for a Healthy Diet",
    //       detail: "Brown rice is a whole grain that Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis est aliquam consequuntur laborum quidem possimus pariatur qui id. Aliquam error iure voluptatum facere incidunt omnis quam sapiente dolor possimus assumenda animi sit laborum nulla, odit iste beatae distinctio officiis saepe aspernatur laboriosam tenetur facilis neque accusamus eos? Ratione asperiores reprehenderit sunt porro quasi, vel magni fugit nihil, nesciunt, nostrum esse earum rem. Repellendus placeat nostrum, nemo fuga perferendis beatae est a. Totam ducimus impedit qui. Quos quam delectus quasi consequuntur voluptate inventore voluptatem aliquid vel nisi ex pariatur, voluptas eligendi aperiam laudantium molestias officiis velit. Pariatur ullam esse corrupti id. 's high in fiber and can help r eg  ulate blood sugar levels.",
    //       blogImage: "https://plus.unsplash.com/premium_photo-1667546569341-1136d35ab1fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODF8fGdyYWlufGVufDB8fDB8fHww",
    //     },
    //     {
    //       _id: "5",
    //       heading: "The Power of Barley",
    //       detail: "Barley is a versatile grain that Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis est aliquam consequuntur laborum quidem possimus pariatur qui id. Aliquam error iure voluptatum facere incidunt omnis quam sapiente dolor possimus assumenda animi sit laborum nulla, odit iste beatae distinctio officiis saepe aspernatur laboriosam tenetur facilis neque accusamus eos? Ratione asperiores reprehenderit sunt porro quasi, vel magni fugit nihil, nesciunt, nostrum esse earum rem. Repellendus placeat nostrum, nemo fuga perferendis beatae est a. Totam ducimus impedit qui. Quos quam delectus quasi consequuntur voluptate inventore voluptatem aliquid vel nisi ex pariatur, voluptas eligendi aperiam laudantium molestias officiis velit. Pariatur ullam esse corrupti id.  can improve digestion and lowe r   cholesterol levels.",
    //       blogImage: "https://plus.unsplash.com/premium_photo-1670135171026-37ce1cdb5502?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODV8fGdyYWlufGVufDB8fDB8fHww",
    //     },
    //     {
    //       _id: "6",
    //       heading: "The Nutritional Value of Millet",
    //       detail: "Millet is rich in magnesium and  Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis est aliquam consequuntur laborum quidem possimus pariatur qui id. Aliquam error iure voluptatum facere incidunt omnis quam sapiente dolor possimus assumenda animi sit laborum nulla, odit iste beatae distinctio officiis saepe aspernatur laboriosam tenetur facilis neque accusamus eos? Ratione asperiores reprehenderit sunt porro quasi, vel magni fugit nihil, nesciunt, nostrum esse earum rem. Repellendus placeat nostrum, nemo fuga perferendis beatae est a. Totam ducimus impedit qui. Quos quam delectus quasi consequuntur voluptate inventore voluptatem aliquid vel nisi ex pariatur, voluptas eligendi aperiam laudantium molestias officiis velit. Pariatur ullam esse corrupti id. helps in reducing blood pressur e   and the risk of heart attacks.",
    //       blogImage: "https://images.unsplash.com/photo-1536497711584-cb73b8133f01?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGdyYWlufGVufDB8fDB8fHww",
    //     },
    //     {
    //       _id: "7",
    //       heading: "The Health Benefits of Rye",
    //       detail: "Rye is high in fiber and nutrien Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis est aliquam consequuntur laborum quidem possimus pariatur qui id. Aliquam error iure voluptatum facere incidunt omnis quam sapiente dolor possimus assumenda animi sit laborum nulla, odit iste beatae distinctio officiis saepe aspernatur laboriosam tenetur facilis neque accusamus eos? Ratione asperiores reprehenderit sunt porro quasi, vel magni fugit nihil, nesciunt, nostrum esse earum rem. Repellendus placeat nostrum, nemo fuga perferendis beatae est a. Totam ducimus impedit qui. Quos quam delectus quasi consequuntur voluptate inventore voluptatem aliquid vel nisi ex pariatur, voluptas eligendi aperiam laudantium molestias officiis velit. Pariatur ullam esse corrupti id. ts and can improve digestive he al  th and reduce the risk of chronic diseases.",
    //       blogImage: "https://images.unsplash.com/photo-1716209235882-fed4b22f615a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njd8fGdyYWlufGVufDB8fDB8fHww",
    //     },
    //     {
    //       _id: "8",
    //       heading: "Exploring the Nutrients in Spelt",
    //       detail: "Spelt is an ancient grain that's Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis est aliquam consequuntur laborum quidem possimus pariatur qui id. Aliquam error iure voluptatum facere incidunt omnis quam sapiente dolor possimus assumenda animi sit laborum nulla, odit iste beatae distinctio officiis saepe aspernatur laboriosam tenetur facilis neque accusamus eos? Ratione asperiores reprehenderit sunt porro quasi, vel magni fugit nihil, nesciunt, nostrum esse earum rem. Repellendus placeat nostrum, nemo fuga perferendis beatae est a. Totam ducimus impedit qui. Quos quam delectus quasi consequuntur voluptate inventore voluptatem aliquid vel nisi ex pariatur, voluptas eligendi aperiam laudantium molestias officiis velit. Pariatur ullam esse corrupti id.  rich in protein, fiber, and es se  ntial vitamins and minerals.",
    //       blogImage: "https://plus.unsplash.com/premium_photo-1670839894361-90e9dcd3d2aa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzN8fGdyYWlufGVufDB8fDB8fHww",
    //     },
    //     {
    //       _id: "9",
    //       heading: "Buckwheat: A Gluten-Free Grain",
    //       detail: "Buckwheat is a great option for  Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis est aliquam consequuntur laborum quidem possimus pariatur qui id. Aliquam error iure voluptatum facere incidunt omnis quam sapiente dolor possimus assumenda animi sit laborum nulla, odit iste beatae distinctio officiis saepe aspernatur laboriosam tenetur facilis neque accusamus eos? Ratione asperiores reprehenderit sunt porro quasi, vel magni fugit nihil, nesciunt, nostrum esse earum rem. Repellendus placeat nostrum, nemo fuga perferendis beatae est a. Totam ducimus impedit qui. Quos quam delectus quasi consequuntur voluptate inventore voluptatem aliquid vel nisi ex pariatur, voluptas eligendi aperiam laudantium molestias officiis velit. Pariatur ullam esse corrupti id. gluten-free diets and is rich i n   fiber and essential nutrients.",
    //       blogImage: "https://plus.unsplash.com/premium_photo-1667546569341-1136d35ab1fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODF8fGdyYWlufGVufDB8fDB8fHww",
    //     },
    //     {
    //       _id: "10",
    //       heading: "The Surprising Benefits of Sorghum",
    //       detail: "Sorghum is a highly nutritious g Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis est aliquam consequuntur laborum quidem possimus pariatur qui id. Aliquam error iure voluptatum facere incidunt omnis quam sapiente dolor possimus assumenda animi sit laborum nulla, odit iste beatae distinctio officiis saepe aspernatur laboriosam tenetur facilis neque accusamus eos? Ratione asperiores reprehenderit sunt porro quasi, vel magni fugit nihil, nesciunt, nostrum esse earum rem. Repellendus placeat nostrum, nemo fuga perferendis beatae est a. Totam ducimus impedit qui. Quos quam delectus quasi consequuntur voluptate inventore voluptatem aliquid vel nisi ex pariatur, voluptas eligendi aperiam laudantium molestias officiis velit. Pariatur ullam esse corrupti id. rain that's rich in antioxidant s   and gluten-free.",
    //       blogImage: "https://plus.unsplash.com/premium_photo-1670135171026-37ce1cdb5502?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODV8fGdyYWlufGVufDB8fDB8fHww",
    //     },
    //     {
    //       _id: "11",
    //       heading: "Corn: More Than Just a Side Dish",
    //       detail: "Corn is rich in vitamins, fiber, Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis est aliquam consequuntur laborum quidem possimus pariatur qui id. Aliquam error iure voluptatum facere incidunt omnis quam sapiente dolor possimus assumenda animi sit laborum nulla, odit iste beatae distinctio officiis saepe aspernatur laboriosam tenetur facilis neque accusamus eos? Ratione asperiores reprehenderit sunt porro quasi, vel magni fugit nihil, nesciunt, nostrum esse earum rem. Repellendus placeat nostrum, nemo fuga perferendis beatae est a. Totam ducimus impedit qui. Quos quam delectus quasi consequuntur voluptate inventore voluptatem aliquid vel nisi ex pariatur, voluptas eligendi aperiam laudantium molestias officiis velit. Pariatur ullam esse corrupti id.  and antioxidants, and can be a  v  aluable part of a balanced diet.",
    //       blogImage: "https://images.unsplash.com/photo-1536497711584-cb73b8133f01?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGdyYWlufGVufDB8fDB8fHww",
    //     },
    //     {
    //       _id: "12",
    //       heading: "The Benefits of Eating Amaranth",
    //       detail: "Amaranth is a gluten-free grain  Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis est aliquam consequuntur laborum quidem possimus pariatur qui id. Aliquam error iure voluptatum facere incidunt omnis quam sapiente dolor possimus assumenda animi sit laborum nulla, odit iste beatae distinctio officiis saepe aspernatur laboriosam tenetur facilis neque accusamus eos? Ratione asperiores reprehenderit sunt porro quasi, vel magni fugit nihil, nesciunt, nostrum esse earum rem. Repellendus placeat nostrum, nemo fuga perferendis beatae est a. Totam ducimus impedit qui. Quos quam delectus quasi consequuntur voluptate inventore voluptatem aliquid vel nisi ex pariatur, voluptas eligendi aperiam laudantium molestias officiis velit. Pariatur ullam esse corrupti id. that's high in protein and pack ed   with essential nutrients.",
    //       blogImage: "https://images.unsplash.com/photo-1716209235882-fed4b22f615a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njd8fGdyYWlufGVufDB8fDB8fHww",
    //     },
    //     {
    //       _id: "13",
    //       heading: "Teff: A Super Grain from Ethiopia",
    //       detail: "Teff is rich in calcium, iron, a Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis est aliquam consequuntur laborum quidem possimus pariatur qui id. Aliquam error iure voluptatum facere incidunt omnis quam sapiente dolor possimus assumenda animi sit laborum nulla, odit iste beatae distinctio officiis saepe aspernatur laboriosam tenetur facilis neque accusamus eos? Ratione asperiores reprehenderit sunt porro quasi, vel magni fugit nihil, nesciunt, nostrum esse earum rem. Repellendus placeat nostrum, nemo fuga perferendis beatae est a. Totam ducimus impedit qui. Quos quam delectus quasi consequuntur voluptate inventore voluptatem aliquid vel nisi ex pariatur, voluptas eligendi aperiam laudantium molestias officiis velit. Pariatur ullam esse corrupti id. nd protein, making it a highly  nu  tritious grain.",
    //       blogImage: "https://plus.unsplash.com/premium_photo-1670839894361-90e9dcd3d2aa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzN8fGdyYWlufGVufDB8fDB8fHww",
    //     },
    //     {
    //       _id: "14",
    //       heading: "Farro: An Ancient Grain with Modern Benefits",
    //       detail: "Farro is high in fiber and prote Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis est aliquam consequuntur laborum quidem possimus pariatur qui id. Aliquam error iure voluptatum facere incidunt omnis quam sapiente dolor possimus assumenda animi sit laborum nulla, odit iste beatae distinctio officiis saepe aspernatur laboriosam tenetur facilis neque accusamus eos? Ratione asperiores reprehenderit sunt porro quasi, vel magni fugit nihil, nesciunt, nostrum esse earum rem. Repellendus placeat nostrum, nemo fuga perferendis beatae est a. Totam ducimus impedit qui. Quos quam delectus quasi consequuntur voluptate inventore voluptatem aliquid vel nisi ex pariatur, voluptas eligendi aperiam laudantium molestias officiis velit. Pariatur ullam esse corrupti id. in, making it a great addition  to   salads and soups.",
    //       blogImage: "https://plus.unsplash.com/premium_photo-1667546569341-1136d35ab1fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODF8fGdyYWlufGVufDB8fDB8fHww",
    //     },
    //     {
    //       _id: "15",
    //       heading: "The Nutritional Power of Kamut",
    //       detail: "Kamut is an ancient grain that's Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis est aliquam consequuntur laborum quidem possimus pariatur qui id. Aliquam error iure voluptatum facere incidunt omnis quam sapiente dolor possimus assumenda animi sit laborum nulla, odit iste beatae distinctio officiis saepe aspernatur laboriosam tenetur facilis neque accusamus eos? Ratione asperiores reprehenderit sunt porro quasi, vel magni fugit nihil, nesciunt, nostrum esse earum rem. Repellendus placeat nostrum, nemo fuga perferendis beatae est a. Totam ducimus impedit qui. Quos quam delectus quasi consequuntur voluptate inventore voluptatem aliquid vel nisi ex pariatur, voluptas eligendi aperiam laudantium molestias officiis velit. Pariatur ullam esse corrupti id.  rich in protein, fiber, and es se  ntial nutrients.",
    //       blogImage: "https://plus.unsplash.com/premium_photo-1670135171026-37ce1cdb5502?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODV8fGdyYWlufGVufDB8fDB8fHww",
    //     },
    //     {
    //       _id: "16",
    //       heading: "Freekeh: The New Superfood",
    //       detail: "Freekeh is a type of wheat that' Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis est aliquam consequuntur laborum quidem possimus pariatur qui id. Aliquam error iure voluptatum facere incidunt omnis quam sapiente dolor possimus assumenda animi sit laborum nulla, odit iste beatae distinctio officiis saepe aspernatur laboriosam tenetur facilis neque accusamus eos? Ratione asperiores reprehenderit sunt porro quasi, vel magni fugit nihil, nesciunt, nostrum esse earum rem. Repellendus placeat nostrum, nemo fuga perferendis beatae est a. Totam ducimus impedit qui. Quos quam delectus quasi consequuntur voluptate inventore voluptatem aliquid vel nisi ex pariatur, voluptas eligendi aperiam laudantium molestias officiis velit. Pariatur ullam esse corrupti id. s harvested while still green.  It  's rich in protein and fiber.",
    //       blogImage: "https://images.unsplash.com/photo-1536497711584-cb73b8133f01?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGdyYWlufGVufDB8fDB8fHww",
    //     },
    //     {
    //       _id: "17",
    //       heading: "Exploring the Benefits of Bulgur",
    //       detail: "Bulgur is a quick-cooking whole  Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis est aliquam consequuntur laborum quidem possimus pariatur qui id. Aliquam error iure voluptatum facere incidunt omnis quam sapiente dolor possimus assumenda animi sit laborum nulla, odit iste beatae distinctio officiis saepe aspernatur laboriosam tenetur facilis neque accusamus eos? Ratione asperiores reprehenderit sunt porro quasi, vel magni fugit nihil, nesciunt, nostrum esse earum rem. Repellendus placeat nostrum, nemo fuga perferendis beatae est a. Totam ducimus impedit qui. Quos quam delectus quasi consequuntur voluptate inventore voluptatem aliquid vel nisi ex pariatur, voluptas eligendi aperiam laudantium molestias officiis velit. Pariatur ullam esse corrupti id. grain that's high in fiber and  nu  trients.",
    //       blogImage: "https://images.unsplash.com/photo-1716209235882-fed4b22f615a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njd8fGdyYWlufGVufDB8fDB8fHww",
    //     },
    //     {
    //       _id: "18",
    //       heading: "The Versatility of Einkorn",
    //       detail: "Einkorn is an ancient grain that Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis est aliquam consequuntur laborum quidem possimus pariatur qui id. Aliquam error iure voluptatum facere incidunt omnis quam sapiente dolor possimus assumenda animi sit laborum nulla, odit iste beatae distinctio officiis saepe aspernatur laboriosam tenetur facilis neque accusamus eos? Ratione asperiores reprehenderit sunt porro quasi, vel magni fugit nihil, nesciunt, nostrum esse earum rem. Repellendus placeat nostrum, nemo fuga perferendis beatae est a. Totam ducimus impedit qui. Quos quam delectus quasi consequuntur voluptate inventore voluptatem aliquid vel nisi ex pariatur, voluptas eligendi aperiam laudantium molestias officiis velit. Pariatur ullam esse corrupti id. 's easier to digest and rich in  n  utrients.",
    //       blogImage: "https://plus.unsplash.com/premium_photo-1670839894361-90e9dcd3d2aa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzN8fGdyYWlufGVufDB8fDB8fHww",
    //     },
    //     {
    //       _id: "19",
    //       heading: "Why You Should Add Chia Seeds to Your Diet",
    //       detail: "Chia seeds are a superfood rich  Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis est aliquam consequuntur laborum quidem possimus pariatur qui id. Aliquam error iure voluptatum facere incidunt omnis quam sapiente dolor possimus assumenda animi sit laborum nulla, odit iste beatae distinctio officiis saepe aspernatur laboriosam tenetur facilis neque accusamus eos? Ratione asperiores reprehenderit sunt porro quasi, vel magni fugit nihil, nesciunt, nostrum esse earum rem. Repellendus placeat nostrum, nemo fuga perferendis beatae est a. Totam ducimus impedit qui. Quos quam delectus quasi consequuntur voluptate inventore voluptatem aliquid vel nisi ex pariatur, voluptas eligendi aperiam laudantium molestias officiis velit. Pariatur ullam esse corrupti id. in omega-3 fatty acids, fiber,  an  d protein.",
    //       blogImage: "https://plus.unsplash.com/premium_photo-1667546569341-1136d35ab1fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODF8fGdyYWlufGVufDB8fDB8fHww",
    //     },
    //     {
    //       _id: "20",
    //       heading: "Quinoa: The Perfect Grain for Vegetarians",
    //       detail: "Quinoa is a complete protein and Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis est aliquam consequuntur laborum quidem possimus pariatur qui id. Aliquam error iure voluptatum facere incidunt omnis quam sapiente dolor possimus assumenda animi sit laborum nulla, odit iste beatae distinctio officiis saepe aspernatur laboriosam tenetur facilis neque accusamus eos? Ratione asperiores reprehenderit sunt porro quasi, vel magni fugit nihil, nesciunt, nostrum esse earum rem. Repellendus placeat nostrum, nemo fuga perferendis beatae est a. Totam ducimus impedit qui. Quos quam delectus quasi consequuntur voluptate inventore voluptatem aliquid vel nisi ex pariatur, voluptas eligendi aperiam laudantium molestias officiis velit. Pariatur ullam esse corrupti id.  an excellent source of essenti al   amino acids for vegetarians.",
    //       blogImage: "https://plus.unsplash.com/premium_photo-1670135171026-37ce1cdb5502?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODV8fGdyYWlufGVufDB8fDB8fHww",
    //     },
    //   ];
      
      
      
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/v1/blog`,{
                  
                    headers:{
                      'Accept': 'application/json, text/plain, */*'
                    },
                });
                //console.log(response.data.data.data);
                
                
              const blogsArray = Array.isArray(response.data.data.data) ? response.data.data.data: [response.data.dat.data];
              const sortedBlogs = blogsArray.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));  
              setBlogs(sortedBlogs);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        fetchBlogs();
    }, []);

    

    return (
        <div className="blog-list grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))
        ) : (
          Array.from({ length: 20 }).map((_, i) => (
            <BlogCardShimmer key={i}/>
          ))
        )}
      </div>
      
    );
};

export default BlogList;