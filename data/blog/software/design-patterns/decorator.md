---
draft: false
date: 2016-11-31
title: 'Design Patterns: Decorator'
summary: 'Allows behavior to be dynamically added to individual objects without modifying their code, promoting flexibility and adherence to the open/closed principle.'
tags: ['design patterns']
---

# Introduction

The decorator pattern is used to define additional functionality on a resource.

This is useful when a resource becomes bloated and unwieldy due to all the other requirements the resources implement.

In Ruby & Rails the [Draper](https://github.com/drapergem/draper) gem can be used to implement this design pattern.

Imagine for example, a User resource in a Ruby on Rails application

## Purpose

The decorator pattern allows you to add responsibilities or behavior to an object dynamically without modifying its original class. It promotes flexibility by letting you compose behaviors at runtime instead of creating large, monolithic classes or an explosion of subclasses.

## Use Cases

- Adding presentation logic to models without cluttering them (e.g., formatting a User’s name or displaying status labels).
- Extending objects with additional features, like logging, caching, or validation, without altering their core implementation.
- Layering multiple behaviors on a single object in a flexible and reusable way.
- Wrapping API responses or third-party objects to adapt or enhance their interface for your application.

```ruby:./app/models/user.rb showLineNumbers
class User < ApplicationRecord
  validates :email, presence: true, format: { with: /\A.+@.+$\Z/ }, uniqueness: true, unless: ->(user) {
    user.social_signon != nil
  }
  attr_accessor :skip_password_validation
         :recoverable, :rememberable, :trackable, :validatable

  has_many :uploads, as: :uploadable, dependent: :destroy
  has_one :first_upload, -> { limit(1).order('created_at ASC') },
          class_name: 'Upload'

  has_many :user_conversations, dependent: :destroy
  has_many :conversations, through: :user_conversations
  has_many :stages, through: :conversations
  has_many :messages, dependent: :destroy

  has_many :stage_conversations, -> { where('conversations.stage_id IS NOT NULL') }, through: :user_conversations, source: :conversation
  has_many :private_conversations, -> { where('conversations.stage_id IS NULL') }, through: :user_conversations, source: :conversation

  has_many :posts, dependent: :destroy
  has_many :reactions, dependent: :destroy
  has_many :comments, dependent: :destroy

  has_many :friendships, dependent: :destroy
  has_many :friends, through: :friendships

  has_many :blocks, class_name: 'Block', foreign_key: :user_id, dependent: :destroy
  has_many :blockees, through: :blocks, source: :blockee

  has_many :blocker_blocks, class_name: 'Block', foreign_key: :blockee_id, dependent: :destroy
  has_many :blockers, through: :blocker_blocks, source: :blocker

  has_many :sent_gifts, foreign_key: 'sender_id', class_name: 'VirtualGift'
  has_many :received_gifts, foreign_key: 'receiver_id', class_name: 'VirtualGift'

  has_many :user_reports
  has_many :notifications, foreign_key: :recipient_id

  has_many :customer_orders, class_name: 'Order', foreign_key: :customer_id, dependent: :destroy
  has_many :working_orders, class_name: 'Order', foreign_key: :employee_id, dependent: :destroy

  enum gender: {
    male: 0,
    female: 1
  }

  def full_name
    [
      first_name,
      last_name
    ].compact.join(' ')
  end

  def block(user_id)
    BlockBuilder.new(id, user_id)
  end

  def unblock(user_id)
    blocks.where(blockee_id: user_id).first&.destroy
    if (conversation = private_conversations
       .collect(&:user_conversations)
       .flatten.find { |uc| uc.user_id == user_id }
                        &.conversation)
      conversation.conversation_type = nil
    end
    true
  end

  def report(params)
    user_reports.create(params)
  end

  def find_existing_conversation(id)
    conversation_id =
      private_conversations
      .collect(&:user_conversations)
      .flatten
      .find { |uc| uc.user_id == id }
      &.conversation_id
    {
      conversation_id: conversation_id,
      other_user_name: other_user(id).first_name
    }
  end

  def other_user(id)
    User.find(id)
  end

  def blocked_users_ids
    (blocker_ids + blockee_ids).uniq
  end


  protected

  def password_required?
    return false if skip_password_validation
    super
  end

  class << self
    def search(search)
      terms = search.split(' ')
      location = where('city ILIKE :search OR ward ILIKE :search', search: "%#{terms[0]}%")
      location.uniq
    end
  end
end
```

Comments, relationships, and instance & class methods accounted for, our class becomes large and difficult to maintain.

The decorator design pattern is usually used to help us to extract out logic related generating views, hence the name, `decorator`.

After adding the gem to our `Gemfile` and bundling we'll see the Draper creates a new file where we can extract out the presentation logic of our resources(as opposed to business logic).

We run:

```bash
rails generate decorator User
```

And we'll see that a decorator file is generated.

```ruby:./app/decorators/user.rb showLineNumbers
class UserDecorator < Draper::Decorator
  delegate_all

  # Code
end
```

After that, we'd just need to call `.decorate` in our controllers before sending the resources to the view layer.

```ruby:./controllers/users_controller.rb showLineNumbers
def index
  @users = User.all
end

# becomes

def index
  @users = User.all.decorate
end
```

In the decorator we place the presentation logic.

```ruby:./app/decorators/user.rb showLineNumbers
  def full_name
    if object.first_name && object.last_name
      "#{object.first_name} #{object.last_name}"
    elsif object.first_name
      object.first_name
    else
      'Anonymous'
    end
  end

  def location
    if object.city && object.country
      "#{object.city}, #{object.country}"
    else
      object.country
    end
  end

  def profile_uploads
    object.uploads
  end

  def most_recent_profile_photo
    if object.uploads[0].present?
      url_for(object.uploads[0].media)
    else
      if object.gender.present?
        object.gender == 'female' ? 'https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/user-female-circle-pink-512.png' : 'https://cdn1.iconfinder.com/data/icons/business-charts/512/customer-512.png'
      else
        'https://cdn1.iconfinder.com/data/icons/business-charts/512/customer-512.png'
      end
    end
  end
```

The logic isn't that complicated, but if we performed this type of conditional checks in our partials we might find that the same logic was repeated quickly.

# Conclusion

The Decorator Design Pattern does the following:

- Extracts conditional logic out of the front end partials.

- Extracts presentation logic out of [Active Record](https://guides.rubyonrails.org/active_record_basics.html) resources/models.

- Reduces the need to for helper methods which pollute the global namespace.
