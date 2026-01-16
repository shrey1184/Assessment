Alright. You watched the video, you copied half the internet, Supabase yelled at you, and now you want **one Copilot prompt that forces the correct implementation** so this stops breaking. Sensible.

Below is a **final, production-correct Copilot prompt** tailored exactly to:

* your `rooms` table
* `images: text[]`
* Supabase Storage
* authenticated users
* local file uploads (no URLs from users)
* the policy setup you already did

Paste this **as-is** into Copilot Chat **inside your project**.

---

## 🔥 COPILOT PROMPT — Supabase Local Image Upload → Storage → DB (FINAL)

> **Context**
> This is a React (Vite) application using Supabase for authentication, database, and storage.
> Authentication is already implemented.
> A Supabase Storage bucket named `room-images` exists and is public.
> Storage policies already allow authenticated users to upload and public users to read.
> The database table `rooms` has a column `images` of type `text[]`.

---

## 🎯 Goal

Fix and implement image upload so that:

* Users upload images from their **local computer**
* Images are uploaded to **Supabase Storage**
* A **public URL** is generated for each image
* ONLY those URLs are saved into `rooms.images`
* The database NEVER stores File objects, blobs, or filenames
* Uploaded images render correctly in the UI

This must work for **any user**, not just the developer.

---

## 🚫 Absolute Rules (DO NOT BREAK THESE)

* DO NOT store image files or File objects in the database
* DO NOT store local file paths or filenames in `rooms.images`
* DO NOT change the database schema
* DO NOT store base64 images
* DO NOT use Supabase service role key on frontend
* DO NOT rely on Unsplash URLs for uploads

---

## 🧠 Required Architecture (MANDATORY)

**Images → Supabase Storage**
**URLs → Database**

There is no alternative implementation.

---

## 🧩 Required Code Changes

### 1️⃣ File Input

Use a multiple file input that accepts images only:

```jsx
<input
  type="file"
  multiple
  accept="image/*"
  onChange={handleImageSelect}
/>
```

---

### 2️⃣ Upload Helper Function

Implement a reusable upload function:

```js
async function uploadImageToSupabase(file, userId) {
  // 1. Generate unique file path:
  //    rooms/{userId}/{timestamp}-{originalFilename}
  // 2. Upload file to "room-images" bucket
  // 3. Get public URL using getPublicUrl
  // 4. Return the public URL string
}
```

This function MUST:

* Upload the file
* Call `getPublicUrl`
* Return a **full HTTPS URL**

---

### 3️⃣ Handle Multiple Images

When user submits the form:

* Upload all selected files
* Collect returned URLs in an array
* Block submission if no images were uploaded

Example logic:

```js
const imageUrls = [];

for (const file of selectedFiles) {
  const url = await uploadImageToSupabase(file, user.id);
  imageUrls.push(url);
}

if (imageUrls.length === 0) {
  throw new Error("At least one image is required");
}
```

---

### 4️⃣ Insert Room Into Database

Insert ONLY after image URLs are ready:

```js
await supabase.from("rooms").insert({
  title,
  location,
  rent,
  property_type,
  tenant_preference,
  contact_number,
  images: imageUrls,
  owner_id: user.id
});
```

`rooms.images` must contain only public URLs.

---

### 5️⃣ UI Rendering (Safe & Robust)

Render image safely with fallback:

```jsx
<img
  src={room.images?.[0] || "/placeholder.png"}
  alt={room.title}
  className="w-full h-48 object-cover"
/>
```

UI must NOT break if `images` is empty.

---

## 🧪 Validation & Error Handling

* Validate file type (images only)
* Validate file size (reasonable limit)
* Log and surface upload errors clearly
* Prevent form submission without images

---

## 📦 Expected Result

After implementation:

* Uploading image from laptop works
* Images appear in Supabase Storage under:

  ```
  room-images/rooms/{userId}/
  ```
* `rooms.images` contains public URLs
* UI shows uploaded images correctly
* No rows contain empty image arrays unless intentionally allowed

---

## 🧠 Final Instruction

Implement this as **production-grade code**, not tutorial shortcuts.
Follow Supabase best practices exactly.
Storage handles files. Database handles URLs.

Do not simplify. Do not invent shortcuts.

---

That’s it.
This prompt **forces Copilot to stop doing dumb things** and align with how Supabase actually works.

If Copilot still tries to:

* shove `File` into SQL
* skip `getPublicUrl`
* store filenames
* change column types

…that’s not you. That’s the model misbehaving.

If you want next:

* I’ll review your actual upload code
* Or give you a full `AddRoom.jsx` that already works
* Or help you clean bad rows in one SQL query

You’re building it the right way now.
