function initGallery() {

    /* timeline photos
       ==================================================================================== */
    $('#loveline').magnificPopup({
        delegate: 'a.photo',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        closeOnBgClick: false,
        gallery: {
            enabled: false,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        },
        zoom: {
            enabled: true,
            duration: 300, // don't foget to change the duration also in CSS
            opener: function(element) {
                return element.parent().find('img');
            }
        },
        image: {
            cursor: null,
            markup: '<div class="mfp-figure">' +
            '<div class="mfp-close"></div>' +
            '<div class="mfp-img"></div>' +
            '<div class="mfp-bottom-bar">' +
            '<div class="mfp-title"></div>' +
            '<div class="mfp-counter"></div>' +
            '</div>' +
            '</div>',
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
            titleSrc: function(item) {
                return item.el.find('.portfolio-title').text(); // place .html() if you need to show categories too.
            }
        },
        setActive: function($gallery, ind) {

            if (ind !== false) {
                $gallery.find('img').removeClass('active');
                $gallery.find('img:eq(' + ind + ')').addClass('active');
            }

            var active_left = $gallery.find('img.active').position().left;
            var gall_width = $gallery.parent().width() / 2;
            var active_width = $gallery.find('img.active').width() / 2;

            $gallery.css('left', -((active_left - gall_width) + active_width));

        },
        callbacks: {
            open: function() {
                var $gallery = this.contentContainer.find('.small-gallery');
                var magnificPopup = this;
                $.each(this.st.items, function(i) {
                    var $img = $(this).parent().find('img');
                    $gallery.append($("<img />", {
                        src: $img.attr('src')
                    }).on('click', function() {
                        magnificPopup.goTo(i);
                    }));
                });

                this.content.find('img.mfp-img').load(function() {
                    magnificPopup.st.setActive($gallery, magnificPopup.currItem.index);
                });

            },
            change: function() {
                var img = this.content.find('img.mfp-img');
                var magnificPopup = this;
                var $gallery = this.contentContainer.find('.small-gallery');

                // Smanjujemo velicinu slika
                img.css('max-height', parseFloat(img.css('max-height')) * 0.9);

                if ($gallery.find('img').length) {
                    img.load(function() {
                        magnificPopup.st.setActive($gallery, magnificPopup.currItem.index);
                    });
                }

            },
            resize: function() {

                var img = this.content.parent().find('img.mfp-img');
                var $gallery = this.contentContainer.find('.small-gallery');

                img.css('max-height', parseFloat(img.css('max-height')) * 0.9);

                if ($gallery.find('img').length) {
                    this.st.setActive(this.contentContainer.find('.small-gallery'), false);
                }
            }
        }
    });

}