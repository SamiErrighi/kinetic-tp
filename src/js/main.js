(function() {
  var cards;

  cards = [
    {
      id: 1,
      image: 'memory01.png'
    }, {
      id: 2,
      image: 'memory02.png'
    }, {
      id: 3,
      image: 'memory03.png'
    }, {
      id: 4,
      image: 'memory04.png'
    }, {
      id: 5,
      image: 'memory05.png'
    }, {
      id: 6,
      image: 'memory06.png'
    }
  ];

  (function($) {
    var Card, Memory, memory;
    Card = (function() {
      Card.prototype.id = null;

      Card.prototype.image = null;

      function Card(id, image) {
        this.id = id;
        this.image = image;
      }

      return Card;

    })();
    Memory = (function() {
      Memory.prototype.cards = [];

      Memory.prototype.isCheckable = false;

      Memory.prototype.currentCard = null;

      function Memory() {
        this.init();
      }

      Memory.prototype.init = function() {
        var card, self, _fn, _i, _len;
        self = this;
        _fn = function(card) {
          self.cards.push(new Card(card.id, card.image));
          return self.cards.push(new Card(card.id, card.image));
        };
        for (_i = 0, _len = cards.length; _i < _len; _i++) {
          card = cards[_i];
          _fn(card);
        }
        return this.randomCards();
      };

      Memory.prototype.randomCards = function() {
        return this.cards = _.shuffle(this.cards);
      };

      Memory.prototype.displayCards = function() {
        var card, _i, _len, _ref, _results;
        _ref = this.cards;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          card = _ref[_i];
          _results.push((function(card) {
            return $(function() {
              return $("#card").append('<div data-id="' + card.id + '" class="card"><div class="card-hide"></div><img src="img/' + card.image + '"></div>');
            });
          })(card));
        }
        return _results;
      };

      Memory.prototype.isPair = function(id) {
        this.isCheckable = false;
        if (this.currentCard.id === id) {
          return true;
        } else {
          return false;
        }
      };

      Memory.prototype.setCard = function(id) {
        var card;
        card = _.first(_.where(this.cards, {
          id: id
        }));
        if (card.id) {
          this.currentCard = card;
          return this.isCheckable = true;
        }
      };

      return Memory;

    })();
    memory = new Memory();
    memory.displayCards();
    return $(function() {
      return $(".card").on("click", function() {
        var id, result;
        $(this).find('.card-hide').hide();
        id = $(this).data('id');
        if (memory.isCheckable) {
          result = memory.isPair(id);
          if (result) {
            $(function() {
              return $(this).find('.card-hide').show();
            });
            $(function() {
              return $(".card[data-id='" + memory.currentCard.id + "']").find('.card-hide').show();
            });
          }
          return memory.currentCard = null;
        } else {
          return memory.setCard(id);
        }
      });
    });
  })(jQuery);

}).call(this);
