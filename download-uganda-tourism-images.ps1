# Create folder
New-Item -ItemType Directory -Force -Path "uganda-tourism-images"
$images = @{
"hero.jpg"="https://images.unsplash.com/photo-1501785888041-af3ef285b470"
"bwindi.jpg"="https://images.unsplash.com/photo-1544551763-46a013bb70d5"
"murchison.jpg"="https://upload.wikimedia.org/wikipedia/commons/3/36/Murchison_Falls%2C_Uganda_%2823475021234%29.jpg"
"queen_elizabeth.jpg"="https://images.unsplash.com/photo-1508675801627-066ac4346a6f"
"safari.jpg"="https://images.unsplash.com/photo-1587502537745-84a1c2a3b3ab"
"gorilla.jpg"="https://images.unsplash.com/photo-1560347876-aeef00ee58a1"
"nile.jpg"="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
"conservation.jpg"="https://images.unsplash.com/photo-1516426122078-c23e76319801"
}

foreach ($name in $images.Keys) {
    $url = $images[$name]
    $path = "uganda-tourism-images/$name"
    Invoke-WebRequest $url -OutFile $path
}

Write-Host "Download complete. Images saved in uganda-tourism-images folder."